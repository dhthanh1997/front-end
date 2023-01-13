/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { Observable } from 'rxjs';
import { content } from './tag';

const url = 'http://10.2.6.142:8092/taskManagement/api/tag';

@Injectable({
  providedIn: 'root',
})
export class TaskTagService {
  constructor(private http: HttpClient, private i18n: NzI18nService) {}

  switchLanguage() {
    this.i18n.setLocale(en_US);
  }

  public getTag(
    pageNumber: number,
    pageSize: number,
    txtSearch?: string
  ): Observable<any> {
    return this.http.get(
      `${url}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${txtSearch}`
    );
  }

  public addTag(tag: content): Observable<any> {
    return this.http.post(url, tag);
  }

  public getTagById(id: number): Observable<any> {
    return this.http.get(`${url}/${id}`);
  }

  public updateTag(id: number, tag: content): Observable<any> {
    return this.http.put(`${url}/${id}`, tag);
  }

  public deleteTag(id: number): Observable<any> {
    return this.http.delete(`${url}/${id}`);
  }
}
