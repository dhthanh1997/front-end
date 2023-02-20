import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { roleAppContent } from '../../model/role-app';
import { RoleAppData } from './role-app-data';
import { RoleAppApi } from './role-app.api';

@Injectable()
export class RoleAppService implements RoleAppData {

  constructor(private api: RoleAppApi) { }

  search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any> {
    return this.api.search(pageNumber, pageSize, txtSearch);
  }

  save(data: roleAppContent): Observable<any> {
    return this.api.save(data);
  }

  update(id:number, data: roleAppContent): Observable<any> {
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
