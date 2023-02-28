import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/_base/http.service';
import { UploadFile } from '../../model/upload-file';
import { ResponseDataObject } from '../../other/responseDataObject';

@Injectable()
export class UploadFileApi {

  private readonly apiController: string = 'uploadFile';

  constructor(private http: HttpService) { }

  uploadFileInTask(data: UploadFile, files: File[]): Observable<ResponseDataObject> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('files', file);
    })
    formData.append('data', JSON.stringify(data));
    return this.http.post(`${this.apiController}/task`, formData);
  }


  uploadFileInTaskWithReportProgress(data: UploadFile, files: File[]): Observable<ResponseDataObject> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('files', file);
    })
    formData.append('data', JSON.stringify(data));
    return this.http.post(`${this.apiController}/task`, formData, { reportProgress: true, observe: 'events' });
  }


  uploadFileInProject(data: UploadFile, files: File[]): Observable<ResponseDataObject> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('files', file);
    })
    formData.append('data', JSON.stringify(data));
    return this.http.post(`${this.apiController}/project`, formData);
  }

  uploadFileInProjectWithReportProgress(data: UploadFile, files: File[]): Observable<ResponseDataObject> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('files', file);
    })
    formData.append('data', JSON.stringify(data));
    return this.http.post(`${this.apiController}/project`, formData, { reportProgress: true, observe: 'events' });
  }

  downloadFileInTask(item: any): Observable<any> {
    return this.http.post(`${this.apiController}/getFileById`, item, { responseType: 'blob' });
  }

  downloadFileInProject(item: any): Observable<any> {
    return this.http.post(`${this.apiController}/getFileById`, item);
  }

  getFileInTask(id: number): Observable<any> {
    return this.http.post(`${this.apiController}/getNameFileInTask`, id);

  }

  getFileInProject(id: number): Observable<any> {
    return this.http.post(`${this.apiController}/getNameFileInProject`, id);

  }

  deleteFile(item: any): Observable<any> {
    return this.http.post(`${this.apiController}/deleteFile`, item);
  }


}
