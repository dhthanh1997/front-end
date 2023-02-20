import { Observable } from "rxjs";
import { commentContent } from "../../model/comment";

export abstract class CommentData {
  abstract search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any>;
  abstract save(data: commentContent): Observable<any>;
  abstract update(id:number, data: commentContent): Observable<any>;
  abstract getById(id: number): Observable<any>;
  abstract deleteById(id: number): Observable<any>;
}
