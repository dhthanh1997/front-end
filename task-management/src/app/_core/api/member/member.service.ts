import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { memberContent } from './member';

const urlMember = 'http://10.2.6.142:8092/taskManagement/api/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private http: HttpClient) {}

  public getMember(
    pageNumber: number,
    pageSize: number,
    txtSearch?: string
  ): Observable<any> {
    return this.http.get(
      `${urlMember}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${txtSearch}`
    );
  }

  public addMember(member: memberContent): Observable<any> {
    return this.http.post(urlMember, member);
  }

  public getMemberById(id: number): Observable<any> {
    return this.http.get(`${urlMember}/${id}`);
  }

  public updateMember(id: number, member: memberContent): Observable<any> {
    return this.http.put(`${urlMember}/${id}`, member);
  }

  public deleteMember(id: number): Observable<any> {
    return this.http.delete(`${urlMember}/${id}`);
  }

  public deleteSelectedMember(ListId: number[]): Observable<any> {
    return this.http.post(`${urlMember}/deleteByListId`, ListId);
  }
}
