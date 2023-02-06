import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { forEach } from 'lodash';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { catchError, concatMap, debounceTime, firstValueFrom, map, merge, of, pairwise, startWith, Subscription, switchMap, take, tap, throwError } from 'rxjs';
import { NotifyService } from 'src/app/_base/notify.service';
import { initDataObject, initFormArray, setDataInFormArray, updateControlInArray } from 'src/app/_base/util';
import { TaskData } from 'src/app/_core/api/task/taskData';
import { ResponseStatus } from 'src/app/_core/enum/responseStatus';
import { Task } from 'src/app/_core/model/task';
import { ResponseDataObject } from 'src/app/_core/other/responseDataObject';
import { ShareService } from 'src/app/_share/share.service';

@Component({
  selector: 'app-task-detail-table',
  templateUrl: './task-detail-table.component.html',
  styleUrls: ['./task-detail-table.component.scss']
})
export class TaskDetailTableComponent implements OnInit {

  private sub: Subscription = new Subscription()

  public isCompleted: boolean = false;

  private task: Task = new Task();

  public formValidation!: FormGroup;

  public idTask: number = 0;
  public indexSubTask: number = 0;

  public isShow: boolean = false;
  public isNotAddRow: boolean = false;
  public listOfData: Task[] = [];


  constructor(private fb: FormBuilder,
    private taskData: TaskData,
    private shareService: ShareService,
    private notifyServce: NotifyService,
    private modelRef: NzModalRef<TaskDetailTableComponent>
    ) {
    this.formValidation = initFormArray("subTask");
  }

  get subTask() {
    return this.formValidation.get("subTask") as FormArray;
  }

  get lastItemArray() {
    const array = this.subTask;
    return array.controls[array.controls.length - 1] as FormGroup;
  }

  ngOnInit(): void {
    console.log(this.formValidation);
    // this.getData();
    setTimeout(() => {
      this.watchForChange();
    }, 300)
  }

  // getData() {
  //   const shareData$ = (this.shareService.taskData);
  //   const source$ = shareData$.asObservable().pipe(concatMap(res => {
  //     // console.log(res);
  //     if (res) {
  //       this.idTask = res.item.controls.id.value;
  //       // clear mảng
  //       this.subTask.clear();
  //       return this.taskData.getByParentId(this.idTask);
  //     }
  //     return of(null);
  //   }),
  //     catchError(err => throwError(() => new Error(err))));

  //   // subscribe
  //   source$.subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       if (res?.message === ResponseStatus.success) {
  //         console.log("--- detail ok");
  //         this.formValidation = setDataInFormArray(res.data, "subTask", this.formValidation, this.task);
  //       }
  //       else {
  //         this.notifyServce.error("Có lỗi xảy ra");
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }


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
    console.log("--is change--");

    // this.subTask.valueChanges.pipe(startWith(undefined), pairwise(), debounceTime(1000), map(([prev, current]: [any, any]) => {
    //   let ignorePropeties = ['isUpdate', 'isShow', 'isInside', 'expand', 'createdBy', 'createdDate', 'lastModifiedBy', 'lastModifiedDate'];
    //   let prevObject: any;
    //   let currentObject: any;
    //   if (prev) {
    //     prevObject = Object.entries(prev)[0][1];
    //     currentObject = Object.entries(current)[0][1];
    //   }

    //   console.log(prevObject);
    //   if (prevObject) {
    //     let prevObjectIgnore = _.omit(prevObject, ignorePropeties);
    //     let currentObjectIIgnore = _.omit(currentObject, ignorePropeties);
    //     if (!_.isEqual(prevObjectIgnore, currentObjectIIgnore)) {
    //       // console.log(prev.name);
    //       // console.log(current);  
    //       console.log("sub different in id: ");
    //       return {
    //         value: current,
    //         isUpdate: true
    //       };
    //     }
    //   }
    //   console.log(current);
    //   return current;
    // }), switchMap((valueChanged: any) => {
    //   if (valueChanged) {
    //     return of(valueChanged);
    //   }
    //   return of(null);
    // })).subscribe(res => {
    //   console.log(res);

    // })

  }
  //


  addSubTask() {
    const array = this.subTask;
    if (array && array.controls.length > 0) {
      let lastItem = this.lastItemArray;
      console.log(lastItem);
      // ten cua task ma null thi khong duoc add tiep vao array
      if (lastItem.get('name')?.value) {
        // console.log(lastItem.get('name')?.value)
        const form: FormGroup = initDataObject(this.task, this.task);
        this.subTask.controls.push(form);
      } else {
        this.isNotAddRow = !this.isNotAddRow;
        this.autoFocus(lastItem);
      }
    }
    else {
      const form: FormGroup = initDataObject(this.task, this.task);
      this.subTask.push(form);
    }

  }

  saveTask() {
    const item = this.formValidation.get('subTask')?.value;
    this.taskData.save(item).subscribe({
      next: (res) => {
        if (res.message === ResponseStatus.error) {
          this.notifyServce.error(res.error);
        }
        if (res.message === ResponseStatus.success) {
          this.notifyServce.success("Thành công");
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  close() {
    this.modelRef.close();
  }

}
