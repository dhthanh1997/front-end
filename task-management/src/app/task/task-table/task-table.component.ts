import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { initDataObject, initListDataObject } from 'src/app/_base/util';
import { Task, taskList, todoTable } from 'src/app/_core/model/task';
import { ShareService } from 'src/app/_share/share.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit {

  public formValidation!: FormGroup;

  public isHover: boolean = false;

  public isOpen: boolean = true;

  public isCollapsed: boolean = true;
  public Collapse: boolean = false;
  public listOfData: Task[] = [];
  public task = new Task();

  // public todoTable: todoTable = {
  //   id: 0,
  //   name: '',
  //   date: new Date(),
  //   dateCreated: new Date(),
  //   status: 'To Do',
  //   expand: false,
  //   isShow: false
  // }

  constructor(private fb: FormBuilder, private shareService: ShareService, private elementRef: ElementRef, private renderer2: Renderer2 ) {
     this.listOfData = taskList();
     console.log(taskList())
   }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formValidation = initListDataObject(this.listOfData, this.task, "taskArray");
    console.log(this.formValidation);
  }

  get taskArray() {
    return this.formValidation.get("taskArray") as FormArray;
  }


  // public listOfData: todoTable[] = [
  //   {
  //     id: 1,
  //     name: 'John Brown',
  //     date: new Date(),
  //     dateCreated: new Date(),
  //     status: 'To Do',
  //     expand: false,
  //     isShow: false
  //   },
  //   {
  //     id: 2,
  //     name: 'John Wick',
  //     date: new Date(),
  //     dateCreated: new Date(),
  //     status: 'Doing',
  //     expand: false,
  //     isShow: false
  //   },
  //   {
  //     id: 3,
  //     name: 'Testing',
  //     date: new Date(),
  //     dateCreated: new Date(),
  //     status: 'Done',
  //     expand: false,
  //     isShow: false
  //   },
  // ];

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
    this.isCollapsed = event;
  }

  detailTask(item: any) {
    console.log(item);
    this.isCollapsed = !this.isCollapsed;
    this.shareService.taskData.next(item);
  }

  getTask(item: any) {
    console.log(item);
    this.shareService.taskData.next(item);
  }

  addTask() {
    const form: FormGroup = initDataObject(this.task, this.task);
    this.taskArray.controls.push(form);
  }

  updateTask() {

  }

  search() {

  }

}
