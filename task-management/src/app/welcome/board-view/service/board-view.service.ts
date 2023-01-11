/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { Observable } from 'rxjs';
import { content } from './task';

// const urlTag = 'http://10.2.6.142:8092/api/tag';

const urlTask = 'http://10.2.6.142:8092/taskManagement/api/task';

@Injectable({
  providedIn: 'root',
})
export class BoardViewService {
  constructor(private http: HttpClient, private i18n: NzI18nService) {}

  switchLanguage() {
    this.i18n.setLocale(en_US);
  }

  // public getTag(
  //   pageNumber: number,
  //   pageSize: number,
  //   txtSearch?: string
  // ): Observable<any> {
  //   return this.http.get(
  //     `${urlTag}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${txtSearch}`
  //   );
  // }

  public getTask(
    pageNumber: number,
    pageSize: number,
    txtSearch?: string
  ): Observable<any> {
    return this.http.get(
      `${urlTask}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${txtSearch}`
    );
  }

  public addTask(task: content): Observable<any> {
    return this.http.post(urlTask, task);
  }

  public getTaskById(id: number): Observable<any> {
    return this.http.get(`${urlTask}/${id}`);
  }

  public updateTask(id: number, project: content): Observable<any> {
    return this.http.put(`${urlTask}/${id}`, project);
  }

  public deleteTask(id: number): Observable<any> {
    return this.http.delete(`${urlTask}/${id}`);
  }

  // public deleteSelectedTask(ListId: number[]): Observable<any> {
  //   return this.http.post(`${urlTask}/deleteByListId`, ListId);
  // }
}
