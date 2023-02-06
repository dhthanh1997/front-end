import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { catchError, concatMap, debounceTime, firstValueFrom, from, map, of, pairwise, startWith, Subscription, take, throwError } from 'rxjs';
import { NotifyService } from 'src/app/_base/notify.service';
import { initDataObject, initFormArray, initFormObject } from 'src/app/_base/util';
import { TaskData } from 'src/app/_core/api/task/taskData';
import { ResponseStatus } from 'src/app/_core/enum/responseStatus';
import { Task } from 'src/app/_core/model/task';
import { ShareService } from 'src/app/_share/share.service';
import { TaskDetailFrmComponent } from './task-detail-frm/task-detail-frm.component';
import * as _ from 'lodash';
import { ResponseDataObject } from 'src/app/_core/other/responseDataObject';

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
    private notifyServce: NotifyService,
    private modal: NzModalService) {
    this.formValidation = initFormObject(this.task, this.task);
    this.formValidation.addControl("subTask", this.fb.array([]));

  }

  ngOnDestroy(): void {

  }

  ngOnInit() {

    // this.initData();

    this.getData();
    // không cần watch change, angular tự check change và update theo hàm watchForChange ở parent component
    this.watchForChange();
    console.log(this.formValidation);
  }

  // initData() {
  //   // let res: any = await firstValueFrom(this.shareService.taskData);
  //   this.shareService.taskData.subscribe({
  //     next: (res) => {
  //       // console.log(res);
  //       this.formValidation = res.item;
  //       this.idTask = res.index;

  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })

  // }

  // getDataById(id: number) {
  //   if (id && id > 0) {
  //     this.taskData.getById(id).subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.formValidation = initFormObject(res?.data, this.task);
  //         this.formValidation.addControl("subTask", this.fb.array([]));
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       }
  //     });
  //   }
  // }

  getData() {
    const shareData$ = (this.shareService.taskData);
    const source$ = shareData$.asObservable().pipe(concatMap(res => {
      console.log(res);
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
        console.log(res);
        if (res?.message === ResponseStatus.success) {
          console.log("--- detail ok");
          this.formValidation.patchValue(res.data);
        } else {
          this.notifyServce.error("Có lỗi xảy ra");
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

  get lastItemArray() {
    const array = this.subTask;
    return array.controls[array.controls.length - 1] as FormGroup;
  }

  watchForChange() {
    if (this.formValidation) {
      this.formValidation.valueChanges.pipe(startWith(undefined), pairwise(), debounceTime(300), map(([prev, current]: [any, any]) => {
        let prevValue = _.omit(prev, ['isUpdate', 'isShow', 'isInside', 'expand', 'createdBy', 'createdDate', 'lastModifiedBy', 'lastModifiedDate','subTask']);
        let currentValue = _.omit(current, ['isUpdate', 'isShow', 'isInside', 'expand', 'createdBy', 'createdDate', 'lastModifiedBy', 'lastModifiedDate','subTask']);
        // console.log(prevValue);
        // console.log(currentValue);
        if (!_.isEqual(prevValue, currentValue)) {
          console.log("different in");
          return {
            item: _.omit(current, ['subTask']),
            isUpdate: true,
            index: this.indexTask
          };
        } 
        else {
          // các trường khác bằng nhau hết
          // check subTask
          let prevValueSubTask = prev.subTask;
          let currentValueSubTask = current.subTask;
          if(!_.isEqual(prevValueSubTask, currentValueSubTask)) {
                        return {
              item: _.omit(current, ['subTask']),
              isUpdate: false,
              isSubTask: true,
              index: this.indexTask
            };
          }
        }
        return {
          item: _.omit(current, ['subTask']),
          isUpdate: false,
          index: this.indexTask
        };
      })).subscribe(res => {
        if (res.isUpdate) {
          this.watchChange.next(res);
        }
        if (res.isSubTask) {
          if (this.subTask.controls.length > 0) {
            this.subTask.controls.forEach(control => {
              if(control.value.id && control.value.id === 0) {
                if (control.value.name) {
                  console.log("add sub");
                  control.value.parentId = res.item;
                  this.saveTask(control.value);
                }
              } 
              if(control.value.id && control.value.id !== 0) { 
                console.log("update sub");
                this.updateTask(control.value);
              }
            });
          }
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


  autoFocus(item: any) {
    // const array = this.taskArray;
    const lastItem = this.lastItemArray;
    if (lastItem == item) {
      this.shareService.isAddRow.next(true);
    }
  }


  onOpenChange(event: any) {

  }



  markCompleted() {
    this.isCompleted = !this.isCompleted;
  }

  uploadFile() {

  }

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
        setTimeout(() => {
          this.shareService.isAddRow.next(true);
          this.lastItemArray.get('parentId')?.setValue(this.idTask);
          // lastItem = this.lastItemArray;
          // if (lastItem.get('name')?.value) {
          //   lastItem.valueChanges.pipe(debounceTime(500), take(1)).subscribe(
          //     {
          //       next: (res) => {
          //         if (res) {
          //           console.log(res);
          //           let task: Task = lastItem.value;
          //           this.saveTask(task);
          //         }
          //       },
          //       error: (err) => {
          //         console.log(err);
          //       },
          //       complete: () => {

          //       }
          //     }
          //   );
          // }
        }, 200);


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
        formValidation: this.formValidation
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
          this.notifyServce.error(res.error);
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

  addTask() {
    // const array = this.taskArray;
    let lastItem = this.lastItemArray;
    console.log(lastItem);
    // ten cua task ma null thi khong duoc add tiep vao array
    if (lastItem.get('name')?.value) {
      // console.log(lastItem.get('name')?.value)
      const form: FormGroup = initDataObject(this.task, this.task);
      this.subTask.controls.push(form);
      setTimeout(() => {
        this.shareService.isAddRow.next(true);
        lastItem = this.lastItemArray;
        if (lastItem.get('name')?.value) {
          lastItem.valueChanges.pipe(debounceTime(500), take(1)).subscribe(
            {
              next: (res) => {
                if (res) {
                  console.log(res);
                  let task: Task = lastItem.value;
                  this.saveTask(task);
                }
              },
              error: (err) => {
                console.log(err);
              },
              complete: () => {

              }
            }
          );
        }
      }, 200);


    } else {
      this.isNotAddRow = !this.isNotAddRow;
      this.autoFocus(lastItem);
    }

  }

  saveTask(item: any) {
    this.taskData.save(item).subscribe({
      next: (res) => {
        if (res.message === ResponseStatus.error) {
          this.notifyServce.error(res.error);
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
