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

  uploadFileInTask(data: UploadFile): Observable<ResponseDataObject> {
    return this.http.post(`${this.apiController}/task`, data);
  }

  uploadFileInProject(data: UploadFile): Observable<ResponseDataObject> {
    return this.http.post(`${this.apiController}/project`, data);
  }

}
