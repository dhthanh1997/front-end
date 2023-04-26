import { Observable } from "rxjs";
import { rolePermissionContent } from "../../model/role-permission";

export abstract class RolePermissionData {
  abstract search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any>;
  abstract save(data: rolePermissionContent): Observable<any>;
  abstract update(id:number, data: rolePermissionContent): Observable<any>;
  abstract getById(id: number): Observable<any>;
  abstract deleteById(id: number): Observable<any>;
  abstract deleteSelectedId(data: number[]): Observable<any>;
  abstract saveList(data: [rolePermissionContent]): Observable<any>;
}
