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

  search(pageNumber: number, pageSize: number, txtSearch?: string, sort?: string): Observable<ResponseDataObject> {
    let params = new HttpParams()
    .set('pageNumber', pageNumber)
    .set('pageSize', pageSize)
    .set('search', (txtSearch) ? txtSearch : '')
    .set('sort', (sort) ? sort : '')
    // if(txtSearch) {
    //   params.append('txtSearch', txtSearch);
    // }
    // if(sort) {
    //   params.append('sort', sort);
    // }
    return this.http.get(this.apiController, { params });
  }


  save(data: Task): Observable<ResponseDataObject> {
    return this.http.post(this.apiController, data);
  }

  saveListTask(data: Task[]): Observable<ResponseDataObject> {
    return this.http.post(`${this.apiController}/listTask`, data);
  }

  updateListTask(data: Task[]): Observable<ResponseDataObject> {
    return this.http.post(`${this.apiController}/updateListTask`, data);
  }

  update(id: number, data: Task): Observable<ResponseDataObject> {
    return this.http.put(`${this.apiController}` + "/" + id, data);
  }

  getById(id: number): Observable<ResponseDataObject> {
    return this.http.get(`${this.apiController}` + "/" + id);
  }

  getByParentId(id: number): Observable<ResponseDataObject> {
    return this.http.get(`${this.apiController}` + "/withParent/" + id);
  }

  deleteById(id: number): Observable<ResponseDataObject> {
    return this.http.delete(`${this.apiController}` + "/" + id);
  }

  deleteSelectedId(data: number[]): Observable<ResponseDataObject> {
    return this.http.post(`${this.apiController}` + "/deleteByListId", data);
  }

  markCompleteTask(id: number): Observable<ResponseDataObject> {
    return this.http.put(`${this.apiController}/markCompleteTask/`+ id, {});
  }

  uploadFile(data: Blob): Observable<ResponseDataObject> {
    return this.http.post(`${this.apiController}/uploadFile`, data);
  }

}
