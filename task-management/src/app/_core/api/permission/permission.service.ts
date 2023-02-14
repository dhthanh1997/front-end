import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { permissionContent } from './permission';

const urlPermission = 'http://10.2.6.142:8092/taskManagement/api/permission';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private http: HttpClient) {}

  public getPermission(
    pageNumber: number,
    pageSize: number,
    txtSearch?: string
  ): Observable<any> {
    return this.http.get(
      `${urlPermission}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${txtSearch}`
    );
  }

  public addPermission(permission: permissionContent): Observable<any> {
    return this.http.post(urlPermission, permission);
  }

  public getPermissionById(id: number): Observable<any> {
    return this.http.get(`${urlPermission}/${id}`);
  }

  public updatePermission(
    id: number,
    permission: permissionContent
  ): Observable<any> {
    return this.http.put(`${urlPermission}/${id}`, permission);
  }

  public deletePermission(id: number): Observable<any> {
    return this.http.delete(`${urlPermission}/${id}`);
  }

  public deleteSelectedPermission(ListId: number[]): Observable<any> {
    return this.http.post(`${urlPermission}/deleteByListId`, ListId);
  }
}
