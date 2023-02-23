import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFile } from '../../model/upload-file';
import { ResponseDataObject } from '../../other/responseDataObject';
import { UploadFileData } from './upload-file-data';
import { UploadFileApi } from './upload-file.api';


@Injectable()
export class UploadFileService implements UploadFileData {

  constructor(private api: UploadFileApi) { }

  downloadFileInTask(id: number): Observable<any> {
    return this.api.downloadFileInTask(id);
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
