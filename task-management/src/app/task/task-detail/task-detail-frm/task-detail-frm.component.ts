import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { catchError, concatMap, Observable, of, throwError } from 'rxjs';
import { NotifyService } from 'src/app/_base/notify.service';
import { initDataObject, initFormArray, initFormObject, setDataInFormArray, setDataInFormObject, updateFormData } from 'src/app/_base/util';
import { TaskData } from 'src/app/_core/api/task/task-data';
import { ResponseStatusEnum } from 'src/app/_core/enum/responseStatusEnum';
import { Task } from 'src/app/_core/model/task';
import { ShareService } from 'src/app/_share/share.service';
import { TaskDetailTableComponent } from '../common/task-detail-table/task-detail-table.component';

@Component({
  selector: 'app-task-detail-frm',
  templateUrl: './task-detail-frm.component.html',
  styleUrls: ['./task-detail-frm.component.scss'],
})
export class TaskDetailFrmComponent implements OnInit, AfterViewInit {

  public isShow: boolean = false;
  formValidation!: FormGroup;
  public idTask: number = 0;
  public task: Task = new Task();
  public observableTaskDetail$ = new Observable<any>();

  @ViewChild('taskDetailTable') taskDetailTable!: TaskDetailTableComponent;
  @Input() isCompleted: boolean = false;


  constructor(private fb: FormBuilder,
    private shareService: ShareService,
    private taskData: TaskData,
    private notifyService: NotifyService,
    // private taskDetailTable: TaskDetailTableComponent,
    private modelRef: NzModalRef<TaskDetailFrmComponent>) {
    this.formValidation = initFormObject(this.task, new Task());
    this.formValidation.addControl('subTask', this.fb.array([]));
  }

  ngAfterViewInit(): void {
    this.observableTaskDetail$ = this.taskDetailTable.updateListTaskFromAnotherComponent();
  }

  ngOnInit(): void {
    console.log(this.formValidation);
    console.log(this.idTask);
    this.getData();
    this.getSubData();

  }

  onOpenChange(event: any) {

  }

  get subTask() {
    return this.formValidation.get('subTask') as FormArray;
  }


  // event
  mouseOver(event: any) {
    this.isShow = true;
  }

  mouseLeave(event: any) {
    this.isShow = false;
  }
  // end event

  markCompleteTask() {
    this.isCompleted = !this.isCompleted;
    this.taskData.markCompleteTask(this.idTask);
  }

  uploadFile() {

  }

  addSubTask() {
    this.shareService.isAddSubTask.next({
      isAdd: true,
    });
    // if (!this.subTask) {
    //   this.formValidation.addControl("subTask", this.fb.array([]));
    // }
    // const formGroup = initDataObject(new Task(), new Task());
    // const formArray = this.formValidation.get('subTask') as FormArray;
    // formArray.push(formGroup);
    // console.log(formArray);
    // this.formValidation.updateValueAndValidity();
  }

  getData() {
    this.taskData.getById(this.idTask).subscribe({
      next: (res) => {
        console.log(res);
        if (res?.message === ResponseStatusEnum.success) {
          // console.log("--- detail ok");
          // this.formValidation = updateFormData(res.data, this.formValidation, new Task());
          this.formValidation.patchValue(res.data);
          console.log(this.formValidation);
          this.idTask = res.data.id;
        } else {
          this.notifyService.error("Có lỗi xảy ra");
        }
      }
    })
  }

  getSubData() {
    this.taskData.getByParentId(this.idTask).subscribe({
      next: (res) => {
        console.log(res);
        if (res?.message === ResponseStatusEnum.success) {
          console.log("--- detail ok");
          this.formValidation = setDataInFormArray(res.data, 'subTask', this.formValidation, new Task());
        } else {
          this.notifyService.error("Có lỗi xảy ra");
        }
      }
    })

  }

  save() {
    let item = this.formValidation.value;
    const task$ = this.taskData.update(item.id, item);

    // const subTask$ = this.taskDetailTable.updateListTask();
    const subTask$ = this.taskDetailTable.updateListTaskFromAnotherComponent();
    // const subTask$ =  this.taskData.updateListTask(item);
    const source$ = task$.pipe(concatMap(res => {
      console.log(res);
      if (res.message === ResponseStatusEnum.success) {
        return subTask$;
      }
      return of(res);
    }), catchError(err => throwError(() => new Error(err))));

    source$.subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          this.notifyService.success("Thành công");
          // this.shareService.isDialogSave.next(true);
          this.closeWithData();
        }

      },
      error: (err) => {
        console.log(err);
      }
    })

    // this.taskData.save(item).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     if (res.message === ResponseStatusEnum.error) {
    //       this.notifyService.error(res.error);
    //     }
    //     if (res.message === ResponseStatusEnum.success) {
    //       // this.notifyService.success("Thành công");
    //       this.shareService.isDialogSave.next(true);
    //     }
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // });
  }


  close() {
    this.modelRef.close();
  }

  closeWithData() {
    this.modelRef.close(this.formValidation.value);
  }

}
