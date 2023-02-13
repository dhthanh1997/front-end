import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../model/task';
import { ResponseDataObject } from '../../other/responseDataObject';
import { TaskApi } from './task.api';
import { TaskData } from './task-data';

@Injectable()
export class TaskService implements TaskData {

  constructor(private api: TaskApi) { }

  updateListTask(data: Task[]): Observable<ResponseDataObject> {
     return this.api.updateListTask(data);
  }

  saveListTask(data: Task[]): Observable<ResponseDataObject> {
    return this.api.saveListTask(data);
  }

  getByParentId(id: number): Observable<ResponseDataObject> {
     return this.api.getByParentId(id);
  }

  search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<ResponseDataObject> {
    return this.api.search(pageNumber, pageSize, txtSearch);
  }

  save(data: Task): Observable<ResponseDataObject> {
    return this.api.save(data);
  }

  update(id:number, data: Task): Observable<ResponseDataObject> {
    return this.api.update(id, data);
  }

  getById(id: number): Observable<ResponseDataObject> {
    return this.api.getById(id);

  }

  deleteById(id: number): Observable<ResponseDataObject> {
    return this.api.deleteById(id);

  }

  markCompleteTask(id: number): Observable<ResponseDataObject> {
    return this.api.markCompleteTask(id);
  }
}
