import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { initDataObject } from 'src/app/_base/util';
import { Task } from 'src/app/_core/model/task';

@Component({
  selector: 'app-task-detail-frm',
  templateUrl: './task-detail-frm.component.html',
  styleUrls: ['./task-detail-frm.component.scss']
})
export class TaskDetailFrmComponent implements OnInit {

  @Input() isCompleted: boolean = false;
  @Input() formValidation!: FormGroup;
  
  constructor(private fb: FormBuilder, private modelRef: NzModalRef<TaskDetailFrmComponent> ) { }

  ngOnInit(): void {
  }

  onOpenChange(event: any) {

  }

  get subTask() {
    return this.formValidation.get('subTask') as FormArray;
  }


  markCompleted() {
    this.isCompleted = !this.isCompleted;
  }

  uploadFile() {

  }

  addSubTask() {
    if(!this.subTask) {
      this.formValidation.addControl("subTask", this.fb.array([]));
    } 
    const formGroup = initDataObject(new Task(), new Task());
    const formArray =  this.formValidation.get('subTask') as FormArray;
    formArray.push(formGroup);
    console.log(formArray);
    this.formValidation.updateValueAndValidity();
  }

  save() {

  }

  close() {
      this.modelRef.close();
  }

}
