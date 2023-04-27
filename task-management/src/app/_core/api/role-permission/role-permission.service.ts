import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { rolePermissionContent } from '../../model/role-permission';
import { RolePermissionData } from './role-permission-data';
import { RolePermissionApi } from './role-permission.api';

@Injectable()
export class RolePermissionService implements RolePermissionData {

  constructor(private api: RolePermissionApi) { }

  search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any> {
    return this.api.search(pageNumber, pageSize, txtSearch);
  }

  save(data: rolePermissionContent): Observable<any> {
    return this.api.save(data);
  }

  update(id:number, data: rolePermissionContent): Observable<any> {
    return this.api.update(id, data);
  }

  getById(id: number): Observable<any> {
    return this.api.getById(id);
  }

  deleteById(id: number): Observable<any> {
    return this.api.deleteById(id);
  }

  deleteSelectedId(data: number[]): Observable<any> {
    return this.api.deleteSelectedId(data);
  }

  saveList(data: [rolePermissionContent]): Observable<any> {
    return this.api.saveList(data);
  }
}
