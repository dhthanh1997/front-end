import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/_base/http.service';
import { projectContent } from '../../model/project';

@Injectable()
export class ProjectApi {

  private readonly apiController: string = 'project';

  constructor(private http: HttpService) { }

  search(pageNumber: number, pageSize: number, txtSearch?: string, sort?: string): Observable<any> {
    // let params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
    return this.http.get(
      `${this.apiController}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${txtSearch}&sort=${sort}`
    );
  }

  save(data: projectContent): Observable<any> {
    return this.http.post(this.apiController, data);
  }

  update(id: number, data: projectContent): Observable<any> {
    return this.http.put(`${this.apiController}` + "/" + id, data);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiController}` + "/" + id);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${this.apiController}` + "/" + id);
  }

  deleteSelectedId(data: number[]): Observable<any> {
    return this.http.post(`${this.apiController}/deleteByListId`, data);
  }

}
