import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { catchError, concatMap, debounceTime, firstValueFrom, from, map, of, pairwise, startWith, Subscription, take, throwError } from 'rxjs';
import { NotifyService } from 'src/app/_base/notify.service';
import { initDataObject, initFormArray, initFormObject, setDataInFormArray, updateControlInArray } from 'src/app/_base/util';
import { TaskData } from 'src/app/_core/api/task/taskData';
import { ResponseStatus } from 'src/app/_core/enum/responseStatus';
import { Task } from 'src/app/_core/model/task';
import { ShareService } from 'src/app/_share/share.service';
import { TaskDetailFrmComponent } from './task-detail-frm/task-detail-frm.component';
import * as _ from 'lodash';
import { ResponseDataObject } from 'src/app/_core/other/responseDataObject';
import { TaskDetailTableComponent } from './task-detail-table/task-detail-table.component';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription()

  public isCompleted: boolean = false;

  // public subTask: Task[] = [];

  private task: Task = new Task();

  public formValidation!: FormGroup;

  public idTask: number = 0;
  public indexTask: number = 0;

  public isShow: boolean = false;
  public isNotAddRow: boolean = false;

  @Input() isCollapsed: boolean = true;
  @Output() collapEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() watchChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    private taskData: TaskData,
    private shareService: ShareService,
    private notifyService: NotifyService,
    private modal: NzModalService) {
    this.formValidation = initFormObject(this.task, this.task);
    this.formValidation.addControl("subTask", this.fb.array([]));

  }

  ngOnDestroy(): void {

  }

  ngOnInit() {

    // this.initData();

    this.getData();
    this.getSubData();
    // không cần watch change, angular tự check change và update theo hàm watchForChange ở parent component
    this.watchForChange();
    // console.log(this.formValidation);
  }


  getSubData() {
    const shareData$ = (this.shareService.taskData);
    const source$ = shareData$.asObservable().pipe(concatMap(res => {
      // console.log(res);
      if (res) {
        this.idTask = res.item.controls.id.value;
        this.indexTask = res.index;
        return this.taskData.getByParentId(this.idTask);
      }
      return of(null);
    }),
      catchError(err => throwError(() => new Error(err))));

    // subscribe
    source$.subscribe({
      next: (res) => {
        // console.log(res);
        if (res?.message === ResponseStatus.success) {
          console.log("--- detail ok");
          this.formValidation = setDataInFormArray(res.data, 'subTask', this.formValidation, this.task);
        } else {
          this.notifyService.error("Có lỗi xảy ra");
        }
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  getData() {
    const shareData$ = (this.shareService.taskData);
    const source$ = shareData$.asObservable().pipe(concatMap(res => {
      // console.log(res);
      if (res) {
        this.idTask = res.item.controls.id.value;
        this.indexTask = res.index;
        return this.taskData.getById(this.idTask);
      }
      return of(null);
    }),
      catchError(err => throwError(() => new Error(err))));

    // subscribe
    source$.subscribe({
      next: (res) => {
        // console.log(res);
        if (res?.message === ResponseStatus.success) {
          console.log("--- detail ok");
          this.formValidation.patchValue(res.data);
        } else {
          this.notifyService.error("Có lỗi xảy ra");
        }
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  get subTask() {
    return this.formValidation.get("subTask") as FormArray;
  }

  // get lastItemArray() {
  //   const array = this.subTask;
  //   return array.controls[array.controls.length - 1] as FormGroup;
  // }

  watchForChange() {
    if (this.formValidation) {
      this.formValidation.valueChanges.pipe(startWith(undefined), pairwise(), debounceTime(300), map(([prev, current]: [any, any]) => {
        let prevValue = _.omit(prev, ['isUpdate', 'isShow', 'isInside', 'expand', 'createdBy', 'createdDate', 'lastModifiedBy', 'lastModifiedDate', 'subTask']);
        let currentValue = _.omit(current, ['isUpdate', 'isShow', 'isInside', 'expand', 'createdBy', 'createdDate', 'lastModifiedBy', 'lastModifiedDate', 'subTask']);
        // console.log(prevValue);
        // console.log(currentValue);
        if (!_.isEqual(prevValue, currentValue)) {
          console.log("different in");
          return {
            item: _.omit(current, ['subTask']),
            // item: current,
            isUpdate: true,
            index: this.indexTask
          };
        }
        return {
          item: _.omit(current, ['subTask']),
          // item: current,
          isUpdate: false,
          index: this.indexTask
        };
      })).subscribe(res => {
        console.log(res);
        if (res.isUpdate) {
          this.watchChange.next(res);
        }

      })
    }
  }

  mouseOver(event: any) {
    this.isShow = true;
  }

  mouseLeave(event: any) {
    this.isShow = false;
  }



  onOpenChange(event: any) {

  }



  markCompleted() {
    this.isCompleted = !this.isCompleted;
  }

  uploadFile() {

  }

  addSubTask() {
    // this.shareService.isAddSub.next(true);
    this.modal.create({
      nzContent: TaskDetailTableComponent,
      nzTitle: "Thêm mới công việc",
      nzCentered: true,
      nzMaskClosable: false,
      nzDirection: 'ltr',
      nzClassName: 'modal-custom',
      nzClosable: true,
      nzComponentParams: {
        // formValidation: this.formValidation
        idTask: (this.formValidation.get('id')?.value) ? this.formValidation.get('id')?.value : 0,
        isDialog: true
      }
    }).afterClose.subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }


  fullScreen() {
    this.modal.create({
      nzContent: TaskDetailFrmComponent,
      nzCentered: true,
      nzMaskClosable: false,
      nzDirection: 'ltr',
      nzClassName: 'modal-custom',
      nzFooter: null,
      nzClosable: false,
      nzComponentParams: {
        // formValidation: this.formValidation
        idTask: (this.formValidation.get('id')?.value) ? this.formValidation.get('id')?.value : 0
      }
    }).afterClose.subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  async updateTask(item: Task) {
    let response: ResponseDataObject = await firstValueFrom(this.taskData.update(item.id, item));
    return response;
  }

  deleteTask() {
    let id = this.formValidation.get('id')?.value;
    this.taskData.deleteById(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === ResponseStatus.error) {
          this.notifyService.error(res.error);
        }
        if (res.message === ResponseStatus.success) {
          this.close();
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addTag() {

  }


  saveTask(item: any) {
    this.taskData.save(item).subscribe({
      next: (res) => {
        if (res.message === ResponseStatus.error) {
          this.notifyService.error(res.error);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  close() {
    this.sub.unsubscribe();
    this.collapEvent.emit({
      isChange: true,
      value: true
    });
  }

}
