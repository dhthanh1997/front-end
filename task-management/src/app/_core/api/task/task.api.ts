import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/_base/http.service';
import { Task } from '../../model/task';
import { ResponseDataObject } from '../../other/responseDataObject';

@Injectable()
export class TaskApi {

  private readonly apiController: string = 'task';

  constructor(private http: HttpService) { }

  search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<ResponseDataObject> {
    let params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
    return this.http.get(this.apiController, { params });
  }

  save(data: Task): Observable<ResponseDataObject> {
    return this.http.post(this.apiController, data);
  }

  update(id: number, data: Task): Observable<ResponseDataObject> {
    return this.http.put(`${this.apiController}` + "/" + id, data);
  }

  getById(id: number): Observable<ResponseDataObject> {
    return this.http.get(`${this.apiController}` + "/" + id);
  }

  deleteById(id: number): Observable<ResponseDataObject> {
    return this.http.delete(`${this.apiController}` + "/" + id);
  }

  markCompleted(id: number): Observable<ResponseDataObject> {
    return this.http.put(`${this.apiController}/markCompleted` + "/" + id, {});
  }

  uploadFile(data: Blob): Observable<ResponseDataObject> {
    return this.http.post(`${this.apiController}/uploadFile`, data);
  }

}
