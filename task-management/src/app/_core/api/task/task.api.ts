import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/_base/http.service';
import { Task } from '../../model/task';

@Injectable()
export class TaskApi {

  private readonly apiController: string = '/task';

  constructor(private http: HttpService) { }

  save(data: Task): Observable<Task> {
    return this.http.post(this.apiController, data);
  }

  update(id: number, data: Task): Observable<Task> {
    return this.http.put(`${this.apiController}` + "/" + id, data);
  }

  getById(id: number): Observable<Task> {
    return this.http.get(`${this.apiController}` + "/" + id);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${this.apiController}` + "/" + id);
  }

  markCompleted(id: number): Observable<any> {
    return this.http.put(`${this.apiController}/markCompleted` + "/" + id, {});
  }

  uploadFile(data: Blob): Observable<any> {
    return this.http.post(`${this.apiController}/uploadFile`, data);
  }

}
