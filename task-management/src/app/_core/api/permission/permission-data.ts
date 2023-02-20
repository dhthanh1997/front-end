import { Observable } from "rxjs";
import { permissionContent } from "../../model/permission";

export abstract class PermissionData {
  abstract search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any>;
  abstract save(data: permissionContent): Observable<any>;
  abstract update(id:number, data: permissionContent): Observable<any>;
  abstract getById(id: number): Observable<any>;
  abstract deleteById(id: number): Observable<any>;
  abstract deleteSelectedId(data: number[]): Observable<any>;
}
