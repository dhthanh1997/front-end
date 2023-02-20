import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/_base/http.service';
import { tagContent } from '../../model/tag';

@Injectable()
export class TagApi {

  private readonly apiController: string = 'tag';

  constructor(private http: HttpService) { }

  search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any> {
    // let params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
    return this.http.get(
      `${this.apiController}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${txtSearch}`
    );
  }

  save(data: tagContent): Observable<any> {
    return this.http.post(this.apiController, data);
  }

  update(id: number, data: tagContent): Observable<any> {
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
