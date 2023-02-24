import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { is } from 'date-fns/locale';
import * as _ from 'lodash';
import { catchError, concatMap, debounceTime, firstValueFrom, map, merge, of, pairwise, startWith, Subject, Subscription, switchMap, take, throwError } from 'rxjs';
import { NotifyService } from 'src/app/_base/notify.service';
import { initFormArray, setDataInFormArray, initDataObject, setDataInFormObject, EnumUtils } from 'src/app/_base/util';
import { TaskData } from 'src/app/_core/api/task/task-data';
import { Filter } from 'src/app/_core/enum/filter-enum';
import { ResponseStatusEnum } from 'src/app/_core/enum/response-status-enum';
import { ParamSearch } from 'src/app/_core/model/params-search';
import { Task } from 'src/app/_core/model/task';
import { ResponseDataObject } from 'src/app/_core/other/responseDataObject';
import { ShareService } from 'src/app/_share/share.service';

@Component({
  selector: 'app-task-row-table',
  templateUrl: './task-row-table.component.html',
  styleUrls: ['./task-row-table.component.scss'],
})
export class TaskRowTableComponent implements OnInit {

  public formValidation!: FormGroup;
  public isNotAddRow: boolean = false;
  public isCollapsed: boolean = true;
  public isCollapsedTable: boolean = true;
  public listOfData: Task[] = [];
  public task = new Task();
  public isLoadSubTask: boolean = false;
  public isLoading: boolean = false;
  changesUnsubscribe = new Subject();
  public filterParam: string = "";

  @Input() title: string = "";
  @Input() paramSearch: ParamSearch = {
    sorts: [],
    filters: [],
    sortName: '',
    filterName: ''
  }
  // @Input() isLoading: boolean = false;
  @Input() sectionParams: any;
  @Output() collapEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    private notifyService: NotifyService,
    private shareService: ShareService,
    private taskData: TaskData) {
    this.formValidation = initFormArray("taskArray");

  }



  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

  }

  async ngOnInit() {
    console.log(this.paramSearch);
    // this.isLoadingSpinner();
    this.watchForChanges();
    this.updateDataForm();
    this.closeDetailTask();
    this.isFilterTask();
    this.isSortTask();
    // await this.search();
    this.initForm();
  }

  initForm() {
    this.formValidation = setDataInFormArray(this.listOfData, "taskArray", this.formValidation, this.task);

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
    this.watchForChanges();
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
  }

  autoFocus(item: any) {
    // const array = this.taskArray;
    const lastItem = this.lastItemArray;
    if (lastItem == item) {
      this.shareService.isAddRow.next(true);
    }
  }

  // sửa ở form detail sẽ emit ra đây để update lên component này
  updateDataForm() {
    let index = 0;
    let id = 0;
    let item = new Task();
    const taskDetail$ = this.shareService.taskDetailShare
    const source$ = taskDetail$.pipe(concatMap(res => {
      if (res.isUpdate) {
        index = res.index;
        id = res.item.id;
        item = res.item;
        return this.taskData.update(id, item);
      }
      return of(null);
    })
      , catchError((err) => throwError(() => new Error(err))));


    source$.subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.message === ResponseStatusEnum.error) {
          this.notifyService.error(res.error);
        }
        if (res.message === ResponseStatusEnum.success) {
          console.log("update task");
          this.updateControl(res.data, index);
        }

      },
      error: (err) => {
        console.log(err);
      }
    });



  }

  closeDetailTask() {
    this.shareService.isCloseDetailTask.subscribe(res => {
      if (res) {
        this.isCollapsed = !this.isCollapsed;
      }
    });
  }

  async openSubTask(item: any, index: number) {

    let formGroup = this.taskArray.controls[index] as FormGroup;
    let array = formGroup.get('subTask') as FormArray;
    let oldValue = formGroup.get('isSubTask')!.value
    if (!array) {
      formGroup.addControl('subTask', this.fb.array([]));
      let id = item.get('id')?.value;
      let res: ResponseDataObject = await firstValueFrom(this.taskData.getByParentId(id));
      if (res.data.length > 0) {
        formGroup = setDataInFormArray(res.data, 'subTask', formGroup, new Task());
      }
      formGroup.get('isSubTask')!.patchValue(!oldValue);
    } else {
      formGroup.get('isSubTask')!.patchValue(!oldValue);
    }
    formGroup.updateValueAndValidity();

  }

  // end event

  updateControl(item: any, index: number) {
    // debugger;
    const array = this.taskArray;
    let formGroup = array.controls[index] as FormGroup;
    // console.log(formGroup);
    if (formGroup) {
      formGroup = setDataInFormObject(item, formGroup, new Task());
      formGroup.updateValueAndValidity();
    }

  }


  detailTask(item: any, index: number) {
    // console.log(item);
    this.isCollapsed = !this.isCollapsed;
    this.shareService.taskDataShare.next({
      item: item,
      index: index
    });

    this.shareService.isCollapseDetailTask.next(this.isCollapsed);
  }

  getTask(item: any, index: number) {
    // console.log("in get task");
    this.shareService.taskDataShare.next({
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
      control.valueChanges.pipe(pairwise(), debounceTime(1000),
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

  isFilterTask() {
    this.shareService.isFilterTask.subscribe(async (res) => {
      if (res) {
        this.paramSearch = res;
        console.log(this.paramSearch);
        await this.search();
        await this.initForm();
        this.watchForChanges();
      }
    });
  }

  isSortTask() {
    this.shareService.isSortTask.subscribe(async (res) => {
      if (res) {
        this.paramSearch = res;
        await this.search();
        await this.initForm();
        this.watchForChanges();
      }
    });
  }

  async search() {
    // debugger;
    this.isLoading = true;
    if (this.paramSearch.filterName !== "") {
      this.filterParam = this.paramSearch.filterName;
    }
    console.log(this.filterParam);

    this.taskArray.clear();
    // set state 0 = Chưa hoàn thành; 1= Hoàn thành
    switch (this.filterParam) {
      case EnumUtils.getKeyByValue(Filter, Filter.NOT_DONE):
        this.paramSearch.filterName = 'state.eq.' + '0' + ',';
        break;
      case EnumUtils.getKeyByValue(Filter, Filter.DONE):
        this.paramSearch.filterName = 'state.eq.' + '1' + ',';
        break;
      default:
        // this.paramSearch.filterName = '';
        // this.paramSearch.filterName = 'state.eq.' + '0' + ',';
        break;
    }

    // với các trường hợp search với điều kiện null
    // => cú pháp field.nu.abs (với abs ghi thế nào cx được: là ký tự tượng trưng nhưng bắt buộc phải có)

    console.log(this.paramSearch);
    if (!this.isCollapsedTable) {
      let searchParam = this.paramSearch.filterName + 'parentId.nu.nu' + ',' + `sectionId.eq.${this.sectionParams},`
      let sortName = this.paramSearch.sortName + ',';
      let response: ResponseDataObject = await firstValueFrom(this.taskData.search(1, 999, searchParam, sortName));
      console.log(response);
      // console.log(this.paramSearch);

      if (response.message === ResponseStatusEnum.success) {
        this.listOfData = response.pagingData.content;
      }
    }
    this.isLoading = false;

  }

}
