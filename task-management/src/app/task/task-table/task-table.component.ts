import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { initListDataObject } from 'src/app/_base/util';
import { todoTable } from 'src/app/_core/model/task';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit {

  public formValidation!: FormGroup;

  public isHover: boolean = false;

  public todoTable: todoTable = {
    id: 0,
    name: '',
    date: new Date(),
    dateCreated: new Date(),
    status: '',
    expand: false
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  initForm() {
    // this.formValidation = this.fb.group(
    //   {
    //     taskArray: this.fb.array([
    //       this.buildObjectGroup()
    //     ])
    //   }
    // )
    initListDataObject(this.listOfData, this.todoTable , "taskArray", this.formValidation);
  }

  get taskArray() {
    return this.formValidation.get("taskArray") as FormArray;
  }

  // buildObjectGroup(): FormGroup {
  //   const group = this.fb.group({
  //     name: ['', []],
  //     date: ['', []],
  //     dateCreated: ['', []],
  //     status: ['', []],
  //   })
  //   return group;
  // }

  public listOfData: todoTable[] = [
    {
      id: 1,
      name: 'John Brown',
      date: new Date(),
      dateCreated: new Date(),
      status: 'To Do',
      expand: false,
    },
    {
      id: 2,
      name: 'John Wick',
      date: new Date(),
      dateCreated: new Date(),
      status: 'Doing',
      expand: false,
    },
    {
      id: 3,
      name: 'Testing',
      date: new Date(),
      dateCreated: new Date(),
      status: 'Done',
      expand: false,
    },
  ];

  onDrop(event: CdkDragDrop<string[]>) {
    console.log(event);
    moveItemInArray(this.listOfData, event.previousIndex, event.currentIndex);
  }

  onOpenChange($event: any) {

  }


}
