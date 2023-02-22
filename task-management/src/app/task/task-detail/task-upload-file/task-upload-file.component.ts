import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { firstValueFrom, Observable, Subject } from 'rxjs';
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
  public progress: Subject<number> = new Subject();

  @Input() taskId: number = 0;

  constructor(
    private modelRef: NzModalRef<TaskUploadFileComponent>,
    private uploadService: UploadFileData,
    private notifyService: NotifyService,
    private shareService: ShareService
  ) { }

  ngOnInit(): void {
  }

  onChangeEventUploadFile(event: any): void {
    console.log(event)
    this.fileList = event;
  }


  save() {
    if (this.fileList && this.fileList.length > 0) {
      this.fileList.forEach(async (file) => {
        if (file) {
          let uploadFile: UploadFile = {};
          // uploadFile.files = this.files;
          uploadFile.taskId = this.taskId;
          uploadFile.name = file.name;
          // let res: ResponseDataObject = await firstValueFrom(this.uploadService.uploadFileInTask(uploadFile, file));
          // console.log(res);
          // if (res.message === ResponseStatusEnum.error) {
          //   this.notifyService.error("Có lỗi trong quá trình upload");
          // }
          this.uploadService.uploadFileInTask(uploadFile, file).subscribe(
            {
              next: (res) => {
                console.log(res);
                // this.progress.next(res);
                if (res.message === ResponseStatusEnum.error) {
                  this.notifyService.error("Có lỗi trong quá trình upload")
                  return;
                }
              },
              error: (err) => {
                console.log(err);
              }
            }
          );
        }
      })
    }
  }

  close() {
    this.modelRef.close();
  }


}
