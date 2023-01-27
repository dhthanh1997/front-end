import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../model/task';
import { TaskApi } from './task.api';
import { TaskData } from './taskData';

@Injectable()
export class TaskService implements TaskData {

  constructor(private api: TaskApi) { }

  save(data: Task): Observable<Task> {
    return this.api.save(data);
  }

  update(id:number, data: Task): Observable<Task> {
    return this.api.update(id, data);
  }

  getById(id: number): Observable<Task> {
    return this.api.getById(id);

  }

  deleteById(id: number): Observable<any> {
    return this.api.deleteById(id);

  }

  markCompleted(id: number): Observable<any> {
    return this.api.markCompleted(id);
  }
}
