import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { is } from 'date-fns/locale';
import * as _ from 'lodash';
import { debounceTime, firstValueFrom, map, merge, of, pairwise, startWith, Subject, Subscription, switchMap, take } from 'rxjs';
import { NotifyService } from 'src/app/_base/notify.service';
import { initFormArray, setDataInFormArray, initDataObject } from 'src/app/_base/util';
import { TaskData } from 'src/app/_core/api/task/taskData';
import { ResponseStatusEnum } from 'src/app/_core/enum/responseStatusEnum';
import { Task } from 'src/app/_core/model/task';
import { ResponseDataObject } from 'src/app/_core/other/responseDataObject';
import { ShareService } from 'src/app/_share/share.service';

@Component({
  selector: 'app-task-row-table',
  templateUrl: './task-row-table.component.html',
  styleUrls: ['./task-row-table.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class TaskRowTableComponent implements OnInit {

  public formValidation!: FormGroup;
  public isHover: boolean = false;
  public isOpen: boolean = true;
  public isNotAddRow: boolean = false;
  public isCollapsed: boolean = true;
  public isCollapsedTable: boolean = true;
  public Collapse: boolean = false;
  public listOfData: Task[] = [];
  public task = new Task();
  public isLoading: boolean = true;
  changesUnsubscribe = new Subject();
  private keyUpEvent$ = new Subject<any>();

  @Input() title: string = "";
  @Output() collapEvent: EventEmitter<any> = new EventEmitter<any>();


  // @ViewChild('iconCustomizeTmpl', { read: TemplateRef }) iconCustomizeTmpl: TemplateRef<any> | string = "";

  constructor(private fb: FormBuilder,
    private notifyService: NotifyService,
    private shareService: ShareService,
    private taskData: TaskData) {
    this.formValidation = initFormArray("taskArray");
  }

  ngOnDestroy(): void {

  }


  ngOnChanges(changes: SimpleChanges): void {

  }

  async ngOnInit() {
    this.isLoadingSpinner();
    this.watchForChanges();
    this.updateDataForm();
    this.closeDetailTask();
    await this.search();
    await this.initForm();
  
  }

  initForm() {
    this.formValidation = setDataInFormArray(this.listOfData, "taskArray", this.formValidation, this.task);
    // console.log(this.formValidation);
  }


  get taskArray() {
    return this.formValidation.get("taskArray") as FormArray;
  }

  get lastItemArray() {
    const array = this.taskArray;
    return array.controls[array.controls.length - 1] as FormGroup;
  }


  // event
  async collapsedTask() {
    this.isCollapsedTable = !this.isCollapsedTable;
    await this.search();
    await this.initForm();
  }

  onDrop(event: CdkDragDrop<string[]>) {
    console.log(event);
    let data = this.taskArray.controls;
    moveItemInArray(data, event.previousIndex, event.currentIndex);
  }

  onOpenChange($event: any) {

  }


  mouseOver(event: any, index: number) {
    // console.log(event);
    this.taskArray.controls[index].get('isShow')?.setValue(true);
    // this.isHover = true;
  }

  mouseLeave(event: any, index: number) {
    // console.log(event);
    this.taskArray.controls[index].get('isShow')?.setValue(false);
  }

  collapseEvent(event: any) {
    console.log(event);
    this.isCollapsed = event.value;
    // clear array sau khi collapse
    // this.taskArray.clear();
    // await this.search();
    // await this.initForm();
    // console.log(this.formValidation);

  }

  autoFocus(item: any) {
    // const array = this.taskArray;
    const lastItem = this.lastItemArray;
    if (lastItem == item) {
      this.shareService.isAddRow.next(true);
    }
  }

  keyUpListenEvent() {
    this.shareService.isKeyUp.subscribe(e => {
      if (e) {
        this.keyUpEvent$.unsubscribe();
      }
    });
  }

  updateDataForm() {
    this.shareService.taskDetailShare.subscribe(async (res) => {
      // this.updateControl(res.item, res.index);
      let result = await this.updateTask(res.item);
      if (result.message === ResponseStatusEnum.error) {
        this.notifyService.error(res.error);
      } else {
        console.log("update task");
        this.updateControl(result.data, res.index);
      }
    });
  }

  isLoadingSpinner() {
    this.shareService.isLoading.subscribe({
      next: (res) => {
        this.isLoading = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  closeDetailTask() {
    this.shareService.isCloseDetailTask.subscribe(res => {
      if(res) {
        this.isCollapsed = !this.isCollapsed;
      }
    })
  }

  // end event

  updateControl(item: any, index: number) {
    const array = this.taskArray;
    const formGroup = array.controls[index] as FormGroup;
    formGroup.patchValue(item);
    formGroup.updateValueAndValidity();
    // console.log(formGroup);
  }


  // isOutSide() {
  //   this.shareService.isOutSide.subscribe(
  //     {
  //       next: (res) => {
  //         console.log(res);
  //         if (res) {
  //           this.watchForChanges();
  //           // this.shareService.isInside.next(false);
  //         }
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       }
  //     }
  //   )
  // }

  // watchChange(event: any) {
  //   console.log(event);
  //   this.updateControl(event.item, event.index);
  // }

  // detectClickEvent(item: any, index: number) {
  //   // console.log(item);
  //   item.get('isInside').setValue(true);
  //   this.shareService.isInside.next({
  //     item,
  //     index
  //   });
  // }

  detailTask(item: any, index: number) {
    // console.log(item);
    this.collapEvent.next(this.isCollapsed);
    this.isCollapsed = !this.isCollapsed;
    this.shareService.taskDataShare.next({
      item: item,
      index: index
    });
    this.shareService.isCollapseDetailTask.next(this.isCollapsed);
  }

  getTask(item: any, index: number) {
    // console.log(item);
    this.shareService.taskDataShare.next({
      item: item,
      index: index
    });

    this.shareService.isCollapseDetailTask.next(true);
  }

  addTask() {
    const array = this.taskArray;
    if (array && array.controls.length > 0) {
      let lastItem = this.lastItemArray;
      console.log(lastItem);
      // ten cua task ma null thi khong duoc add tiep vao array
      if (lastItem.get('name')?.value) {
        // console.log(lastItem.get('name')?.value)
        const form: FormGroup = initDataObject(this.task, this.task);
        this.taskArray.controls.push(form);
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
        // console.log("into")
        // debugger;
        // save task sau 0,5s neu khong typing tiep

      } else {
        this.isNotAddRow = !this.isNotAddRow;
        this.autoFocus(lastItem);
      }
    } else {
      const form: FormGroup = initDataObject(this.task, this.task);
      this.taskArray.controls.push(form);
    }

  }

  markCompleteTask(item: any) {
    let id = item.get('id')?.value;
    this.taskData.markCompleteTask(id);
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

  watchForChanges() {
    merge(this.taskArray.controls.map((control: AbstractControl, index: number) => {
      control.valueChanges.pipe(startWith(undefined), pairwise(), debounceTime(1000),
        map(
          ([prev, current]: [any, any]) => {
            // (value) => {
            // console.log(control.value.name);
            // so sánh 2 object dùng lodash
            let prevObject: any = _.omit(prev, ['isUpdate', 'isShow', 'isInside', 'expand', 'createdBy', 'createdDate', 'lastModifiedBy', 'lastModifiedDate']);
            let currentObject: any = _.omit(current, ['isUpdate', 'isShow', 'isInside', 'expand', 'createdBy', 'createdDate', 'lastModifiedBy', 'lastModifiedDate']);
            // console.log(prevObject);
            // console.log(currentObject);

            // mảng ban đầu phải không rỗng mới check 2 object
            if (prevObject) {
              if (!_.isEqual(prevObject, currentObject)) {
                // console.log(prev.name);
                // console.log(current);
                console.log("different in id: " + index);
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
          }),
        switchMap((valueChanged: any) => {
          // console.log(valueChanged)
          if (valueChanged.isUpdate) {
            // this.changesUnsubscribe.complete();
            console.log("into switchMap");
            return this.updateTask(valueChanged.value);
          } else {
            return of(valueChanged);
          }
        }
        )).subscribe((res) => {
          console.log(res);
          if (res.message === ResponseStatusEnum.success) {
            console.log("ok");
            this.updateControl(res.data, index);
          }

        })

    }));

  }

  updateTaskAndControl(item: Task, index: number) {
    this.taskData.update(item.id, item).subscribe({
      next: (res) => {
        if (res.message === ResponseStatusEnum.error) {
          this.notifyService.error(res.error);
        } else {
          this.updateControl(res.data, index);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  async updateTask(item: Task) {
    let response: ResponseDataObject = await firstValueFrom(this.taskData.update(item.id, item));
    return response;
  }

  deleteTask(id: number) {
    this.taskData.deleteById(id).subscribe({
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

  async search() {
    // if(this.taskArray && this.taskArray.controls.length == 0) {
      this.taskArray.clear();
      this.shareService.isLoading.next(true);
      if (!this.isCollapsedTable) {
        let response: ResponseDataObject = await firstValueFrom(this.taskData.search(1, 10));
        console.log(response);
        if (response.message === ResponseStatusEnum.success) {
          this.listOfData = response.pagingData.content;
        }
      }
      this.shareService.isLoading.next(false);
    // }
  }

}
