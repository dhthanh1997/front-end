import { Observable } from "rxjs";
import { teamContent } from "../../model/team";

export abstract class TeamData {
  abstract search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any>;
  abstract save(data: teamContent): Observable<any>;
  abstract update(id:number, data: teamContent): Observable<any>;
  abstract getById(id: number): Observable<any>;
  abstract deleteById(id: number): Observable<any>;
  abstract deleteSelectedId(data: number[]): Observable<any>;
}
