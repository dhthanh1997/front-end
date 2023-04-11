import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subject, firstValueFrom } from 'rxjs';
import { ParamSearch } from 'src/app/_core/model/params-search';
import { Task } from 'src/app/_core/model/task';
import { TaskDetailFrmComponent } from '../../task-detail-frm/task-detail-frm.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TaskData } from 'src/app/_core/api/task/task-data';
import { initFormArray, setDataInFormArray } from 'src/app/_base/util';
import { ResponseDataObject } from 'src/app/_core/other/responseDataObject';
import { isThisHour } from 'date-fns';

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

  @Input() sectionId: number = 0;
  @Input() title: string = "";
  @Input() sectionParams: any;
  @Input() taskId: number = 0;



  constructor(
    private modal: NzModalService,
    private taskData: TaskData,
    private fb: FormBuilder
  ) {
    this.formValidation = initFormArray("taskArray");
  }


  get taskArray() {
    return this.formValidation.get("taskArray") as FormArray;
  }

  async ngOnInit() {
    await this.getTasksById(this.taskId);
    await this.initForm();
    console.log(this.taskArray.value)
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
    debugger;
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

  async openSubTask(item: any, index: number) {
    debugger;
    let formGroup = this.taskArray.controls[index] as FormGroup;
    let array = formGroup.get('subTask') as FormArray;
    let oldValue = formGroup.get('isSubTask')!.value
    if (!array) {
      formGroup.addControl('subTask', this.fb.array([]));
      let id = item.id;
      let res: ResponseDataObject = await firstValueFrom(this.taskData.getByParentId(id));
      console.log(res.data);
      if (res.data.length > 0) {
        formGroup = setDataInFormArray(res.data, 'subTask', formGroup, new Task());
        
      }
      formGroup.get('isSubTask')!.patchValue(!oldValue);
      console.log(this.taskArray.value);
    } else {
      formGroup.get('isSubTask')!.patchValue(!oldValue);
    }
    formGroup.updateValueAndValidity();

  }


  // click từ table sub task
  subTaskInfo(item: any, indexSubTask: number) {
    // let task = this.formValidation.controls[indexSubTask] as FormGroup;

    this.modal
      .create({
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
          idTask: item.id
            ? item.id
            : 0,
        },
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
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
      await this.openSubTask(item, index)
    } else {
      this.expandSet.delete(id);
      let formGroup = this.taskArray.controls[index] as FormGroup;
      let array = formGroup.get('subTask') as FormArray;
      array.clear();
    }
  }

}
