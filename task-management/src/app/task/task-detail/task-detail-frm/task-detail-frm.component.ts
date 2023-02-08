import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { catchError, concatMap, of, throwError } from 'rxjs';
import { NotifyService } from 'src/app/_base/notify.service';
import { initDataObject, initFormArray, initFormObject, setDataInFormArray, setDataInFormObject, updateFormData } from 'src/app/_base/util';
import { TaskData } from 'src/app/_core/api/task/taskData';
import { ResponseStatus } from 'src/app/_core/enum/responseStatus';
import { Task } from 'src/app/_core/model/task';
import { ShareService } from 'src/app/_share/share.service';

@Component({
  selector: 'app-task-detail-frm',
  templateUrl: './task-detail-frm.component.html',
  styleUrls: ['./task-detail-frm.component.scss']
})
export class TaskDetailFrmComponent implements OnInit {

  public isShow: boolean = false;
  formValidation!: FormGroup;
  public idTask: number = 0;
  public task: Task = new Task();

  @Input() isCompleted: boolean = false;


  constructor(private fb: FormBuilder,
    private shareService: ShareService,
    private taskData: TaskData,
    private notifyService: NotifyService,
    private modelRef: NzModalRef<TaskDetailFrmComponent>) {
    this.formValidation = initFormObject(this.task, new Task());
    this.formValidation.addControl('subTask', this.fb.array([]));
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

  markCompleted() {
    this.isCompleted = !this.isCompleted;
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
        if (res?.message === ResponseStatus.success) {
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
        if (res?.message === ResponseStatus.success) {
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
    const subTask$ = this.shareService.isDialogSave;
    const source$ = task$.pipe(concatMap(res => {
      console.log(res);
        if (res.message === ResponseStatus.success) {
          return of(subTask$.next(true));
        }
        return of(res);
    }))

    source$.subscribe({
      next:(res) => { 
          console.log(res);
      },
      error:(err) => {
        console.log(err);
      }
    })

    // this.taskData.save(item).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     if (res.message === ResponseStatus.error) {
    //       this.notifyService.error(res.error);
    //     }
    //     if (res.message === ResponseStatus.success) {
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

}
