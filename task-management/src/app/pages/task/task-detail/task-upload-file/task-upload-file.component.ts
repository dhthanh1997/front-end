import { HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { firstValueFrom, Subject, timer } from 'rxjs';
import { NotifyService } from 'src/app/_base/notify.service';
import { UploadFileData } from 'src/app/_core/api/upload-file/upload-file-data';
import { ResponseStatusEnum } from 'src/app/_core/enum/response-status-enum';
import { UploadFile } from 'src/app/_core/model/upload-file';
import { ResponseDataObject } from 'src/app/_core/other/responseDataObject';
import { ShareService } from 'src/app/_share/share.service';

@Component({
  selector: 'app-task-upload-file',
  templateUrl: './task-upload-file.component.html',
  styleUrls: ['./task-upload-file.component.scss']
})
export class TaskUploadFileComponent implements OnInit {

  public file: any = {};
  public fileList: any[] = []; //
  public upLoading: boolean = false; //
  public progress: number = 0;
  public formValidation!: FormGroup;
  public files: any[] = [];

  @Input() title: string = '';
  @Input() taskId: number = 0;

  constructor(
    private modelRef: NzModalRef<TaskUploadFileComponent>,
    private uploadService: UploadFileData,
    private notifyService: NotifyService,
    private shareService: ShareService,
    private fb: FormBuilder,
  ) {
    this.formValidation = this.fb.group({
      isLoading: [false, []]
    })
  }

  ngOnInit(): void {
    // this.isLoadingSpinner();
    this.getFileNameInTask(this.taskId);
  }

  //event
  isLoadingSpinner() {
    this.shareService.isLoadingModal.subscribe({
      next: (res) => {
        console.log(res);
        this.upLoading = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onChangeEventUploadFile(event: any): void {
    console.log(event)
    this.fileList = event;
  }

  onDeleteEvent(event: any): void {
    if (event && event.message === ResponseStatusEnum.success) {
        this.notifyService.success("Xóa thành công");
    }
    if (event && event.message === ResponseStatusEnum.error) {
      this.notifyService.error(event.message);
  }
  }

  // end event


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


  save() {
    // this.upLoading = true;
    if (this.fileList && this.fileList.length > 0) {
      let uploadFile: UploadFile = {};
      uploadFile.taskId = this.taskId;
      // uploadFile.name = file.name;

      this.uploadService.uploadFileInTask(uploadFile, this.fileList).subscribe(
        {
          next: (res) => {
            console.log(res);
            if (res.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * res.loaded / res.total);
            }
            if (res.message === ResponseStatusEnum.error) {
              this.notifyService.error("Có lỗi trong quá trình upload")
              return;
            }
            if (res.message === ResponseStatusEnum.success) {
              this.notifyService.success("Upload file thành công");
              setTimeout(() => {
                this.close();
              }, 1000);
            }

          },
          error: (err) => {
            console.log(err);
          }
        }
      );
    }
    // this.upLoading = false;

  };


  deleteFile(item: any) {
    let upload: UploadFile = {};
    upload.taskId = this.taskId;
    upload.name = item.name;
    // upload.size = item.size;
    this.uploadService.deleteFileInTask(upload).subscribe(
      {
        next: (res) => {
          console.log(res);
          if (res.message === ResponseStatusEnum.success) {
            this.notifyService.success("Upload file thành công");
          }
        }
      }
    );
  }


  close() {
    this.modelRef.close();
  }


}
