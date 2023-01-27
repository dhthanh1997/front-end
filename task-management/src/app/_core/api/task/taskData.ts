import { Observable } from "rxjs";
import { Task } from "../../model/task";

export abstract class TaskData {
    abstract save(data: Task): Observable<Task>;
    abstract update(id:number, data: Task): Observable<Task>;
    abstract getById(id: number): Observable<Task>;
    abstract deleteById(id: number): Observable<any>;
    abstract markCompleted(id: number): Observable<any>

}