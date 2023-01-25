import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { initDataObject } from 'src/app/_base/util';
import { Task } from 'src/app/_core/model/task';
import { ShareService } from 'src/app/_share/share.service';
import { TaskDetailFrmComponent } from './task-detail-frm/task-detail-frm.component';

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

  @Input() isCollapsed: boolean = true;
  @Output() collapEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private elementRef: ElementRef, private renderer2: Renderer2, private shareService: ShareService, private modal: NzModalService) { }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.shareService.taskData.subscribe({
      next: (res) => {
        
        // console.log(res);
        this.formValidation = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  get subTask() {
    return this.formValidation.get('subTask') as FormArray;
  }

  onOpenChange(event: any) {

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

  fullScreen() {
    this.modal.create({
      nzContent: TaskDetailFrmComponent,
      nzCentered: true,
      nzMaskClosable: false,
      nzDirection: 'ltr',
      nzClassName: 'modal-custom',
      nzFooter: null,
      nzClosable: false
    }).afterClose.subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  close() {
    this.sub.unsubscribe();
    this.collapEvent.emit(true);
  }



}
