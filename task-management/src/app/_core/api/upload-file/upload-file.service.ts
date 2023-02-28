import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFile } from '../../model/upload-file';
import { ResponseDataObject } from '../../other/responseDataObject';
import { UploadFileData } from './upload-file-data';
import { UploadFileApi } from './upload-file.api';


@Injectable()
export class UploadFileService implements UploadFileData {

  constructor(private api: UploadFileApi) { }

  deleteFileInTask(item: UploadFile): Observable<ResponseDataObject> {
    return this.api.deleteFile(item);
  }

  deleteFileInProject(item: UploadFile): Observable<ResponseDataObject> {
    return this.api.deleteFile(item);
  }

  getFileInTask(id: number): Observable<any> {
    return this.api.getFileInTask(id);
  }

  getFileInProject(id: number): Observable<any> {
    return this.api.getFileInProject(id);
  }

  downloadFileInTask(item: any): Observable<any> {
    return this.api.downloadFileInTask(item);
  }

  downloadFileInProject(id: number): Observable<any> {
    return this.api.downloadFileInProject(id);
  }

  uploadFileInTask(item: UploadFile, files: File[]): Observable<ResponseDataObject> {
    return this.api.uploadFileInTask(item, files);
  }
  uploadFileInProject(item: UploadFile, files: File[]): Observable<ResponseDataObject> {
    return this.api.uploadFileInProject(item, files);
  }


}
