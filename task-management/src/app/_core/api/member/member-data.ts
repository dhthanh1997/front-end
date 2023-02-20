import { Observable } from "rxjs";
import { memberContent } from "../../model/member";

export abstract class MemberData {
  abstract search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any>;
  abstract save(data: memberContent): Observable<any>;
  abstract update(id:number, data: memberContent): Observable<any>;
  abstract getById(id: number): Observable<any>;
  abstract deleteById(id: number): Observable<any>;
  abstract deleteSelectedId(data: number[]): Observable<any>;
}
