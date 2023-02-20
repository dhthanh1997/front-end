import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { permissionContent } from '../../model/permission';
import { PermissionData } from './permission-data';
import { PermissionApi } from './permission.api';

@Injectable()
export class PermissionService implements PermissionData {

  constructor(private api: PermissionApi) { }

  search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any> {
    return this.api.search(pageNumber, pageSize, txtSearch);
  }

  save(data: permissionContent): Observable<any> {
    return this.api.save(data);
  }

  update(id:number, data: permissionContent): Observable<any> {
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
}
