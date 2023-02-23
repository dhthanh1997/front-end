import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { catchError, concatMap, debounceTime, firstValueFrom, from, map, of, pairwise, startWith, Subscription, take, throwError } from 'rxjs';
import { NotifyService } from 'src/app/_base/notify.service';
import { initDataObject, initFormArray, initFormObject, setDataInFormArray, updateControlInArray } from 'src/app/_base/util';
import { TaskData } from 'src/app/_core/api/task/task-data';
import { ResponseStatusEnum } from 'src/app/_core/enum/response-status-enum';
import { Task } from 'src/app/_core/model/task';
import { ShareService } from 'src/app/_share/share.service';
import { TaskDetailFrmComponent } from './task-detail-frm/task-detail-frm.component';
import * as _ from 'lodash';
import { ResponseDataObject } from 'src/app/_core/other/responseDataObject';
import { TaskDetailTableComponent } from './common/task-detail-table/task-detail-table.component';
import { InputFileComponent } from 'src/app/_component/input-file/input-file.component';
import { TaskUploadFileComponent } from './task-upload-file/task-upload-file.component';

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

  formValidation!: FormGroup;

  public idTask: number = 0;
  public indexTask: number = 0;

  public isShow: boolean = false;
  public isNotAddRow: boolean = false;

  public isCollapsedTaskDetail: boolean = true;

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
    console.log(this.isCollapsed);
    // this.initData();

    this.getData();
    this.getSubData();
    // không cần watch change, angular tự check change và update theo hàm watchForChange ở parent component
    this.watchForChange();
    // this.collapseListenEvent();
    // console.log(this.formValidation);
  }


  getSubData() {
    const shareData$ = (this.shareService.taskDataShare);
    const source$ = shareData$.asObservable().pipe(concatMap(res => {
      console.log(res);
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
        if (res?.message === ResponseStatusEnum.success) {
          console.log("--- detail ok");
          this.subTask.clear();
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
    const shareData$ = (this.shareService.taskDataShare);
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
        if (res?.message === ResponseStatusEnum.success) {
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
      this.formValidation.valueChanges.pipe(startWith(undefined), pairwise(), debounceTime(1500), map(([prev, current]: [any, any]) => {
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
          this.shareService.taskDetailShare.next(res);
        }

      })
    }
  }

  // event
  collapseListenEvent() {
    this.shareService.isCollapseDetailTask.subscribe(res => {
      console.log(res);
      // if (res) {
        // this.isCollapsed = res;
        console.log(this.isCollapsed);
      // }
    })
  }

  mouseOver(event: any) {
    this.isShow = true;
  }

  mouseLeave(event: any) {
    this.isShow = false;
  }



  onOpenChange(event: any) {

  }

  // end event



  markCompleted() {
    this.isCompleted = !this.isCompleted;
    const formGroup = this.formValidation.get('state') as FormControl;
    // 0: Chưa hoàn thành
    // 1: Hoàn thành
    if(formGroup.value === 0) {
      formGroup.setValue(1);
    }
    if(formGroup.value === 1) {
      formGroup.setValue(0);
    }
    this.formValidation.updateValueAndValidity();
  }

  uploadFile() {
    this.modal.create({
      nzContent: TaskUploadFileComponent,
      // nzTitle: "Upload file",
      nzCentered: true,
      nzMaskClosable: false,
      nzDirection: 'ltr',
      nzClassName: 'modal-custom',
      nzClosable: false,
      nzFooter: null,
      nzComponentParams: {
        title:"Upload file",
        taskId: this.formValidation.get('id')?.value
      }
    })

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
      // nzTitle: 'AAAA',
      nzContent: TaskDetailFrmComponent,
      nzCentered: true,
      nzMaskClosable: false,
      nzDirection: 'ltr',
      nzClassName: 'modal-custom',
      // nzFooter: null,
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
        if (res.message === ResponseStatusEnum.error) {
          this.notifyService.error(res.error);
        }
        if (res.message === ResponseStatusEnum.success) {
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
        if (res.message === ResponseStatusEnum.error) {
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
    // this.isCollapsed = !this.isCollapsed;
    this.shareService.isCloseDetailTask.next(true);
  }

}
