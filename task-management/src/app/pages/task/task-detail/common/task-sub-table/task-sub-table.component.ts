import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subject, firstValueFrom } from 'rxjs';
import { ParamSearch } from 'src/app/_core/model/params-search';
import { Task } from 'src/app/_core/model/task';
import { TaskDetailFrmComponent } from '../../task-detail-frm/task-detail-frm.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TaskData } from 'src/app/_core/api/task/task-data';
import { BinarySearchService, initFormArray, initFormObject, setDataInFormArray } from 'src/app/_base/util';
import { ResponseDataObject } from 'src/app/_core/other/responseDataObject';
import { isThisHour } from 'date-fns';
import { forEach } from 'lodash';

@Component({
  selector: 'app-task-sub-table',
  templateUrl: './task-sub-table.component.html',
  styleUrls: ['./task-sub-table.component.scss']
})
export class TaskSubTableComponent implements OnInit, OnChanges {


  public formValidation!: FormGroup;
  public listOfData: Task[] = [];
  public task = new Task();
  public projectId!: number;
  public isEdit: boolean = false;
  public tagList: any;
  public color: any;
  public expandSet = new Set<number>();

  // set default = -1 trong mảng với trường hợp 1 cấp, nhiều cấp hơn thì add tiếp vào mảng
  public index: number[] = [-1];

  @Input() sectionId: number = 0;
  @Input() title: string = "";
  @Input() sectionParams: any;
  @Input() taskId: number = 0;



  constructor(
    private modal: NzModalService,
    private taskData: TaskData,
    private fb: FormBuilder,
    private binarySearch: BinarySearchService
  ) {
    this.formValidation = initFormArray("taskArray");
  }


  get taskArray() {
    return this.formValidation.get("taskArray") as FormArray;
  }

  getSubTaskArray(id: number) {
    // debugger;
    const formArray = this.taskArray.controls[id].get("taskArray") as FormArray;
    console.log(formArray);
    return formArray;
  }

  async ngOnInit() {
    await this.getTasksById(this.taskId);
    await this.initForm();
    console.log(this.taskArray.value);
    console.log(this.taskArray);

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && changes['id'].currentValue) {
      this.taskId = changes['id'].currentValue;
    }
  }

  initForm() {
    this.formValidation = setDataInFormArray(this.listOfData, "taskArray", this.formValidation, this.task);
    console.log(this.formValidation);
  }

  async getTasksById(id: number) {
    // debugger;
    let res: ResponseDataObject = await firstValueFrom(this.taskData.getByParentId(id));
    if (res.data.length > 0) {
      this.listOfData = res.data;
    }
  }

  // async getSubTaskById(id: number, index: number) {
  //   let res: ResponseDataObject = await firstValueFrom(this.taskData.getByParentId(id));
  //   let formGroup = this.taskArray.controls[index] as FormGroup;
  //   let array = formGroup.get('subTask') as FormArray;
  //   if (res.data.length > 0) {

  //   }
  // }

  async openSubTask(id: number, index: number) {
    this.binarySearch.binarySearchTree(this.formValidation, id, 'taskArray', 'id');
    let formGroup = this.binarySearch.result as FormGroup;
    // let formGroup = this.taskArray.controls[index] as FormGroup;
    let array = formGroup.get('taskArray') as FormArray;
    let res: ResponseDataObject = await firstValueFrom(this.taskData.getByParentId(id));
    if (!array) {
      formGroup.addControl('taskArray', this.fb.array([]));
    } else {
      array.clear();
    }

    if (res.data && res.data.length > 0) {
      formGroup = setDataInFormArray(res.data, 'taskArray', formGroup, new Task());

    }
    formGroup.updateValueAndValidity();
    // if (array && array.length === 0) {
    //     formGroup = setDataInFormArray(res.data, 'taskArray', formGroup, new Task());
    // }
    this.taskArray.updateValueAndValidity();
    console.log(this.taskArray);
  }


  // click từ table sub task
  subTaskInfo(item: any, indexSubTask: number) {
    // let task = this.taskArray.controls[indexSubTask] as FormGroup;

    // let test = this.formValidation.controls['taskArray'] as FormArray;
    // console.log(test.controls.some());
    // console.log(this.formValidation);

    this.binarySearch.binarySearchTree(this.formValidation, item.id, 'taskArray', 'id');
    let task = this.binarySearch.result;
    console.log(task);

    this.modal
      .create({
        nzContent: TaskDetailFrmComponent,
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr',
        nzClassName: 'modal-custom',
        nzClosable: false,
        nzComponentParams: {
          idTask: item.id
            ? item.id
            : 0,
        },
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            res.taskArray = res.subTask;
            task.patchValue(res);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }


  // end 

  async onExpandChange(id: number, checked: boolean, index: number, item: any) {
    if (checked) {
      await this.expandSet.add(id);
      await this.openSubTask(id, index)
    } else {
      this.expandSet.delete(id);
    }
  }

}

