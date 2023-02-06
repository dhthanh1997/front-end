import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
