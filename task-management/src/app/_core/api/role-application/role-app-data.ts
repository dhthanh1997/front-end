import { Observable } from "rxjs";
import { roleAppContent } from "../../model/role-app";

export abstract class RoleAppData {
  abstract search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any>;
  abstract save(data: roleAppContent): Observable<any>;
  abstract update(id:number, data: roleAppContent): Observable<any>;
  abstract getById(id: number): Observable<any>;
  abstract deleteById(id: number): Observable<any>;
  abstract deleteSelectedId(data: number[]): Observable<any>;
}
