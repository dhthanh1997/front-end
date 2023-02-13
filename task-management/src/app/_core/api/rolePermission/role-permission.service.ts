import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { rolePermissionContent } from './role-permission';

const urlRolePermission =
  'http://10.2.6.142:8092/taskManagement/api/rolePermission';

@Injectable({
  providedIn: 'root',
})
export class RolePermissionService {
  constructor(private http: HttpClient) {}

  public getRolePer(
    pageNumber: number,
    pageSize: number,
    txtSearch?: string
  ): Observable<any> {
    return this.http.get(
      `${urlRolePermission}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${txtSearch}`
    );
  }

  public createRolePer(listRolePer: []): Observable<any> {
    return this.http.post(`${urlRolePermission}/rolePermission`, listRolePer);
  }
}
