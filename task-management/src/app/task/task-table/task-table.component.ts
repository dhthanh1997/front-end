import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, debounce, debounceTime } from 'rxjs';
import { initDataObject, initListDataObject } from 'src/app/_base/util';
import { TaskData } from 'src/app/_core/api/task/taskData';
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
  public isNotAddRow: boolean = false;
  public isCollapsed: boolean = true;
  public Collapse: boolean = false;
  public listOfData: Task[] = [];
  public task = new Task();

  constructor(private fb: FormBuilder, private shareService: ShareService, private taskData: TaskData) {
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

  autoFocus(item: any) {
    const array = this.taskArray;
    const lastItem = array.controls[array.controls.length - 1];
    if (lastItem == item && this.isNotAddRow) {
      this.shareService.isAddRow.next(true);
    }
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
    const array = this.taskArray;
    const lastItem = array.controls[array.length - 1] as FormGroup;
    console.log(lastItem);
    // ten cua task ma null thi khong duoc add tiep vao array
    if (lastItem.get('name')?.value) {
      const form: FormGroup = initDataObject(this.task, this.task);
      this.taskArray.controls.push(form);
      setTimeout(() => {
        this.shareService.isAddRow.next(true);
      }, 200);
      // save task sau 0,5s neu khong typing tiep
      lastItem.get('name')?.valueChanges.pipe(debounceTime(500)).subscribe({
        next: (res) => {
          console.log(res);
          let task = lastItem.value;
          this.saveTask(task);
        },
        error: (err) => {
          console.log(err);
        }
      })
      // this.shareService.isAddRow.next(false);
    } else {
      this.isNotAddRow = true;
      this.autoFocus(lastItem);
    }
  }

  saveTask(item: any) {
    this.taskData.save(item).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateTask() {

  }

  deleteTask() {

  }

  search() {

  }

}
