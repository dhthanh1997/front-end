import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { roleAppContent } from './role-app';

const urlRoleApp =
  'http://10.2.6.142:8092/taskManagement/api/roleOfApplication';

@Injectable({
  providedIn: 'root',
})
export class RoleAppService {
  constructor(private http: HttpClient) {}

  public getRoleApp(
    pageNumber: number,
    pageSize: number,
    txtSearch?: string
  ): Observable<any> {
    return this.http.get(
      `${urlRoleApp}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${txtSearch}`
    );
  }

  public addRoleApp(roleApp: roleAppContent): Observable<any> {
    return this.http.post(urlRoleApp, roleApp);
  }

  public getRoleAppById(id: number): Observable<any> {
    return this.http.get(`${urlRoleApp}/${id}`);
  }

  public updateRoleApp(id: number, roleApp: roleAppContent): Observable<any> {
    return this.http.put(`${urlRoleApp}/${id}`, roleApp);
  }

  public deleteRoleApp(id: number): Observable<any> {
    return this.http.delete(`${urlRoleApp}/${id}`);
  }

  public deleteSelectedRoleApp(ListId: number[]): Observable<any> {
    return this.http.post(`${urlRoleApp}/deleteByListId`, ListId);
  }
}
