import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, DoCheck, ElementRef, HostListener, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { debounceTime, distinctUntilChanged, firstValueFrom, fromEvent, map, merge, Observable, of, pairwise, startWith, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { NotifyService } from 'src/app/_base/notify.service';
import { compareProperties, initDataObject, initFormArray, setDataInFormArray } from 'src/app/_base/util';
import { TaskData } from 'src/app/_core/api/task/taskData';
import { ResponseStatus } from 'src/app/_core/enum/responseStatus';
import { Task, taskList, todoTable } from 'src/app/_core/model/task';
import { ResponseDataObject } from 'src/app/_core/other/responseDataObject';
import { ShareService } from 'src/app/_share/share.service';
import * as _ from 'lodash';



@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit, OnDestroy {

  public formValidation!: FormGroup;
  public isHover: boolean = false;
  public isOpen: boolean = true;
  public isNotAddRow: boolean = false;
  public isCollapsed: boolean = true;
  public Collapse: boolean = false;
  public listOfData: Task[] = [];
  public task = new Task();
  // private isInside = false;
  changesUnsubscribe = new Subject();
  private keyUpEvent$ = new Subject<any>();
  constructor(private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private notifyService: NotifyService,
    private shareService: ShareService,
    private taskData: TaskData) {
    this.formValidation = initFormArray("taskArray");
    // this.search();

  }

  ngOnDestroy(): void {

  }


  ngOnChanges(changes: SimpleChanges): void {

  }

  async ngOnInit() {
    await this.search();
    await this.initForm();
    // await this.isOutSide();
    // this.keyUpListenEvent();
    this.watchForChanges();
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

  updateControl(item: any, index: number) {
    const array = this.taskArray;
    const formGroup = array.controls[index] as FormGroup;
    formGroup.patchValue(item);
    // console.log(formGroup);
  }

  isOutSide() {
    this.shareService.isOutSide.subscribe(
      {
        next: (res) => {
          console.log(res);
          if (res) {
            this.watchForChanges();
            // this.shareService.isInside.next(false);
          }
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  watchChange(event: any) {
    console.log(event);
    this.updateControl(event.item, event.index);
  }

  detectClickEvent(item: any, index: number) {
    // console.log(item);
    item.get('isInside').setValue(true);
    this.shareService.isInside.next({
      item,
      index
    });
  }

  detailTask(item: any, index: number) {
    // console.log(item);
    this.isCollapsed = !this.isCollapsed;
    this.shareService.taskData.next({
      item: item,
      index: index
    });
  }

  getTask(item: any, index: number) {
    // console.log(item);
    this.shareService.taskData.next({
      item: item,
      index: index
    });
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
          if (res.message === ResponseStatus.success) {
            console.log("ok");
            this.updateControl(res.data, index);
          }

        })

    }));

  }

  updateTaskAndControl(item: Task, index: number) {
    this.taskData.update(item.id, item).subscribe({
      next: (res) => {
        if (res.message === ResponseStatus.error) {
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
        if (res.message === ResponseStatus.error) {
          this.notifyService.error(res.error);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  async search() {
    this.shareService.isLoading.next(true);
    let response: ResponseDataObject = await firstValueFrom(this.taskData.search(1, 10));
    if (response.message === ResponseStatus.success) {
      this.listOfData = response.pagingData.content;
    }
    this.shareService.isLoading.next(false);
  }

}
