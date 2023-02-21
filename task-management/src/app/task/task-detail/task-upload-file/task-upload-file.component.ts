import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NotifyService } from 'src/app/_base/notify.service';
import { UploadFileData } from 'src/app/_core/api/upload-file/upload-file-data';
import { ResponseStatusEnum } from 'src/app/_core/enum/response-status-enum';
import { UploadFile } from 'src/app/_core/model/upload-file';

@Component({
  selector: 'app-task-upload-file',
  templateUrl: './task-upload-file.component.html',
  styleUrls: ['./task-upload-file.component.scss']
})
export class TaskUploadFileComponent implements OnInit {

  public files: any[] = [];

  @Input() taskId: number = 0;

  constructor(
    private modelRef: NzModalRef<TaskUploadFileComponent>,
    private uploadService: UploadFileData,
    private notifyService: NotifyService
  ) { }

  ngOnInit(): void {
  }

  onChangeEventUploadFile(event: any): void {
    console.log(event)
    this.files = event;
  }


  save() {
    if (this.files && this.files.length > 0) {
      let uploadFile: UploadFile = {};
      uploadFile.files = this.files;
      uploadFile.taskId = this.taskId;
      this.uploadService.uploadFileInTask(uploadFile).subscribe(
        {
          next: (res) => {
            console.log(res);
            if(res.message === ResponseStatusEnum.success) {
              this.notifyService.success("Upload file thành công")
            }
            if(res.message === ResponseStatusEnum.error) {
              this.notifyService.error("Có lỗi trong quá trình upload")
            }
          },
          error: (err) => {
            console.log(err);
          }
        }
      );
    }
  }

  close() {
    this.modelRef.close();
  }


}
