import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { catchError, concatMap, debounceTime, distinctUntilChanged, firstValueFrom, map, merge, of, pairwise, startWith, Subscription, switchMap, take, tap, throwError } from 'rxjs';
import { NotifyService } from 'src/app/_base/notify.service';
import { initDataObject, initFormArray, initFormObject, setDataInFormArray, updateControlInArray } from 'src/app/_base/util';
import { TaskData } from 'src/app/_core/api/task/task-data';
import { ResponseStatusEnum } from 'src/app/_core/enum/response-status-enum';
import { Task } from 'src/app/_core/model/task';
import { ShareService } from 'src/app/_share/share.service';

@Component({
  selector: 'app-task-detail-table',
  templateUrl: './task-detail-table.component.html',
  styleUrls: ['./task-detail-table.component.scss'],
})
export class TaskDetailTableComponent implements OnInit, AfterViewInit, DoCheck {

  private sub: Subscription = new Subscription()
  public isCompleted: boolean = false;
  private task: Task = new Task();
  formValidation!: FormGroup;
  public indexSubTask: number = 0;
  public isShow: boolean = false;
  public isNotAddRow: boolean = false;
  public listOfData: Task[] = [];
  public isUpdate: boolean = false;


  @Input() public isDialog: boolean = false;
  @Input() public idTask: number = 0;
  @Input() public idProject: number = 0;


  constructor(private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private taskData: TaskData,
    private shareService: ShareService,
    private notifyService: NotifyService,
    private modelRef: NzModalRef<TaskDetailTableComponent>
  ) {
    this.formValidation = initFormArray("subTask");

  }


  ngDoCheck(): void {

  }

  get subTask() {
    return this.formValidation.get("subTask") as FormArray;
  }

  get lastItemArray() {
    const array = this.subTask;
    return array.controls[array.controls.length - 1] as FormGroup;
  }

  ngAfterViewInit(): void {
    // this.watchForChange();
  }


  ngOnInit(): void {
    // debugger;
    // console.log(this.idTask);
    this.getSubData();
    this.isDialogSave();
    this.isAddSubTask();
    // this.watchForChange();
    // console.log(this.formValidation);

  }

  isDialogSave() {
    this.shareService.isDialogSave.subscribe(data => {
      if(data) {
        this.updateListTask();
      }

      // if (data.isAdd) {
      //   this.saveListTask();
      // }
      // if (data.isUpdate) {
      //   this.updateListTask();
      // }
    });
  }

  isAddSubTask() {
    this.shareService.isAddSubTask.subscribe(data => {
      console.log(data);
      if (data) {
        this.addSubTask();
      }
    })
  }

  getSubData() {

    const getByParentId$ = this.taskData.getByParentId(this.idTask);
    const $source = getByParentId$.pipe(
      concatMap(res => {
      console.log(res);
      if (res?.message === ResponseStatusEnum.success) {
        console.log("--- detail ok");
        if (res.data && res.data.length === 0) {
          this.task.parentId = this.idTask;
          this.task.setStartDate(new Date());
          this.task.setEndDate(new Date());
          const formGroup = initFormObject(this.task, new Task());
          //  const form = initDataObject(this.task, new Task());
          this.subTask.push(formGroup);
        } else {
          this.formValidation = setDataInFormArray(res.data, 'subTask', this.formValidation, this.task);
        }
        console.log(this.formValidation);
        return of({
          isSuccess: true,
          res: res
        })
      } else {
        return of({
          isSuccess: false,
          res: res
        })
      }
    }),
    catchError(err => throwError(() => new Error(err))) );

    $source.subscribe(res => {
      if(res.isSuccess) {
        this.watchForChange();
      } else {
        this.notifyService.error("Có lỗi xảy ra");
      }
    })



  }


  // event
  autoFocus(item: any) {
    // const array = this.taskArray;
    const lastItem = this.lastItemArray;
    if (lastItem == item) {
      this.shareService.isAddRow.next(true);
    }
  }

  mouseOver(event: any, index: number) {
    // console.log(event);
    this.subTask.controls[index].get('isShow')?.setValue(true);
  }

  mouseLeave(event: any, index: number) {
    // console.log(event);
    this.subTask.controls[index].get('isShow')?.setValue(false);
  }

  onOpenChange($event: any) {

  }

  onDrop(event: CdkDragDrop<string[]>) {
    console.log(event);
    let data = this.subTask.controls;
    moveItemInArray(data, event.previousIndex, event.currentIndex);
  }

  watchForChange() {

    console.log(this.subTask.controls);
    merge(...this.subTask.controls.map((control: AbstractControl, index: number) =>
      control.valueChanges.pipe(pairwise(), debounceTime(500),
        map(([prev, current]: [any, any]) => {
          // debugger;
          // so sánh 2 object dùng lodash
          let prevObject: any = _.omit(prev, ['isUpdate', 'isShow', 'isInside', 'expand', 'createdBy', 'createdDate', 'lastModifiedBy', 'lastModifiedDate']);
          let currentObject: any = _.omit(current, ['isUpdate', 'isShow', 'isInside', 'expand', 'createdBy', 'createdDate', 'lastModifiedBy', 'lastModifiedDate']);
          // console.log(prevObject);
          // console.log(currentObject);
          // mảng ban đầu phải không rỗng mới check 2 object
          if (prevObject) {
            if (!_.isEqual(prevObject, currentObject)) {
              console.log("different detail in id: " + index);
              return {
                value: current,
                isUpdate: true
              };
            }
          }
          return {
            value: current,
            isUpdate: false
          }


        }
        ), switchMap((valueChanged: any) => {
          if (valueChanged.isUpdate) return of(valueChanged);
          return of(null);
        }))))
      .subscribe(changes => {
        console.log(changes);
      });

  }

  // end event


  addSubTask() {
    const array = this.subTask;
    if (array && array.controls.length > 0) {
      let lastItem = this.lastItemArray;
      console.log(lastItem);
      // ten cua task ma null thi khong duoc add tiep vao array
      if (lastItem.get('name')?.value) {
        // console.log(lastItem.get('name')?.value)
        this.task.parentId = this.idTask;
        this.task.setStartDate(new Date());
        this.task.setEndDate(new Date());
        const formGroup = initFormObject(this.task, new Task());
        this.subTask.push(formGroup);
      } else {
        this.isNotAddRow = !this.isNotAddRow;
        this.autoFocus(lastItem);
      }
    }
    else {
      this.task.parentId = this.idTask;
      console.log(this.task.parentId);
      const form: FormGroup = initDataObject(this.task, this.task);
      this.subTask.push(form);
      console.log(form);
    }

  }

  saveListTask() {
    const item = this.formValidation.get('subTask')?.value;
    item.map((x: any) => {
      x.projectId = this.idProject;
      return x;
    })
    this.taskData.saveListTask(item).subscribe({
      next: (res) => {
        if (res.message === ResponseStatusEnum.error) {
          this.notifyService.error(res.error);
        }
        if (res.message === ResponseStatusEnum.success) {
          this.notifyService.success("");
          this.dismiss(res.data);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  // update tại form khác
  public updateListTask() {
    // debugger;
    const item = this.formValidation.get('subTask')?.value;
    this.taskData.updateListTask(item).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === ResponseStatusEnum.error) {
          // return of({
          //   isSuccess: false,
          //   res: res
          // });
        }
        if (res.message === ResponseStatusEnum.success) {
          // return of({
          //   isSuccess: true,
          //   res: res
          // });
          // this.dismiss(res.data);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public updateListTaskFromAnotherComponent() {
    const item = this.formValidation.get('subTask')?.value;
    // console.log(item);
    return this.taskData.updateListTask(item);
  }

  close() {
    this.modelRef.close();
  }

  dismiss(item: any) {
    this.modelRef.close(item);
  }

}
