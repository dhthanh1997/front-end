import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFile } from '../../model/upload-file';
import { ResponseDataObject } from '../../other/responseDataObject';
import { UploadFileData } from './upload-file-data';
import { UploadFileApi } from './upload-file.api';


@Injectable()
export class UploadFileService implements UploadFileData {

  constructor(private api: UploadFileApi) { }

  uploadFileInTask(item: UploadFile, file: File): Observable<ResponseDataObject> {
    return this.api.uploadFileInTask(item, file);
  }
  uploadFileInProject(item: UploadFile, file: File): Observable<ResponseDataObject> {
    return this.api.uploadFileInProject(item, file);
  }


}
