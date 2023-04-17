import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { catchError, concatMap, Observable, of, throwError } from 'rxjs';
import { NotifyService } from 'src/app/_base/notify.service';
import { initDataObject, initFormArray, initFormObject, setDataInFormArray, setDataInFormObject, updateFormData } from 'src/app/_base/util';
import { TaskData } from 'src/app/_core/api/task/task-data';
import { ResponseStatusEnum } from 'src/app/_core/enum/response-status-enum';
import { Task } from 'src/app/_core/model/task';
import { ShareService } from 'src/app/_share/share.service';
import { TaskDetailTableComponent } from '../common/task-detail-table/task-detail-table.component';
import { UploadFileData } from 'src/app/_core/api/upload-file/upload-file-data';
import { TaskUploadFileComponent } from '../task-upload-file/task-upload-file.component';

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
  public files: any[] = [];

  @ViewChild('taskDetailTable') taskDetailTable!: TaskDetailTableComponent;
  @Input() isCompleted: boolean = false;


  constructor(private fb: FormBuilder,
    private shareService: ShareService,
    private taskData: TaskData,
    private notifyService: NotifyService,
    private modal: NzModalService,
    private modelRef: NzModalRef<TaskDetailFrmComponent>,
    private uploadService: UploadFileData) {
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


  getFileNameInTask(id: number) {
    this.uploadService.getFileInTask(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === ResponseStatusEnum.success) {
          this.files = res.data;
        }
      }
    });
  }

  uploadFile() {
    this.modal.create({
      nzContent: TaskUploadFileComponent,
      // nzTitle: "Upload file",
      nzCentered: true,
      nzMaskClosable: false,
      nzDirection: 'ltr',
      // nzClassName: 'modal-custom',
      nzClosable: false,
      nzFooter: null,
      nzComponentParams: {
        title: 'Upload file',
        taskId: this.formValidation.get('id')?.value,
      },
    })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          this.getFileNameInTask(this.idTask);
        },
        error: (err) => {
          console.log(err);
        },
      });
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
        this.formValidation.patchValue(res.data);
        return subTask$;
      }
      return of(res);
    }), catchError(err => throwError(() => new Error(err))));

    source$.subscribe({
      next: (res) => {
        // debugger;
        console.log(res);
        if (res.message === ResponseStatusEnum.success) {
          this.subTask.patchValue(res.data);
          this.notifyService.success("Thành công");
          
          setTimeout(() => {
            this.closeWithData();
          }, 500);
        }

      },
      error: (err) => {
        console.log(err);
      }
    })

  }


  close() {
    this.modelRef.close();
  }

  closeWithData() {
    this.modelRef.close(this.formValidation.value);
  }

}
