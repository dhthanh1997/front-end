import { Observable } from "rxjs";
import { tagContent } from "../../model/tag";

export abstract class TagData {
  abstract search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any>;
  abstract save(data: tagContent): Observable<any>;
  abstract update(id:number, data: tagContent): Observable<any>;
  abstract getById(id: number): Observable<any>;
  abstract deleteById(id: number): Observable<any>;
  abstract deleteSelectedId(data: number[]): Observable<any>;
}
