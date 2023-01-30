import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { NotifyService } from 'src/app/_base/notify.service';
import { initDataObject } from 'src/app/_base/util';
import { TaskData } from 'src/app/_core/api/task/taskData';
import { ResponseStatus } from 'src/app/_core/enum/responseStatus';
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
  @Output() collapEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    private taskData: TaskData,
    private shareService: ShareService,
    private notifyServce: NotifyService,
    private modal: NzModalService) { }

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
    if (!this.subTask) {
      this.formValidation.addControl("subTask", this.fb.array([]));
    }
    const formGroup = initDataObject(new Task(), new Task());
    const formArray = this.formValidation.get('subTask') as FormArray;
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
      nzClosable: false,
      nzComponentParams: {
        formValidation: this.formValidation
      }
    }).afterClose.subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  deleteTask() {
    let id = this.formValidation.get('id')?.value;
    this.taskData.deleteById(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === ResponseStatus.error) {
          this.notifyServce.error(res.error);
        }
        if (res.message === ResponseStatus.success) {
          this.close();
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addTag() {
    
  }

  close() {
    this.sub.unsubscribe();
    this.collapEvent.emit({
      isChange: true,
      value: true
    });
  }



}
