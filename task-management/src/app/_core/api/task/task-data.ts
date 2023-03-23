import { Observable } from "rxjs";
import { Task } from "../../model/task";
import { ResponseDataObject } from "../../other/responseDataObject";

export abstract class TaskData {
    abstract search(pageNumber: number, pageSize: number, txtSearch?: string, sort?: string): Observable<ResponseDataObject>;
    abstract save(data: Task): Observable<ResponseDataObject>;
    abstract saveListTask(data: Task[]): Observable<ResponseDataObject>;
    abstract updateListTask(data: Task[]): Observable<ResponseDataObject>;
    abstract update(id: number, data: Task): Observable<ResponseDataObject>;
    abstract getById(id: number): Observable<ResponseDataObject>;
    abstract getByParentId(id: number): Observable<ResponseDataObject>;
    abstract deleteById(id: number): Observable<ResponseDataObject>;
    abstract deleteSelectedId(data: number[]): Observable<ResponseDataObject>;
    abstract markCompleteTask(id: number): Observable<ResponseDataObject>;

}
