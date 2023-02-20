import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { memberContent } from '../../model/member';
import { MemberData } from './member-data';
import { MemberApi } from './member.api';

@Injectable()
export class MemberService implements MemberData {

  constructor(private api: MemberApi) { }

  search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any> {
    return this.api.search(pageNumber, pageSize, txtSearch);
  }

  save(data: memberContent): Observable<any> {
    return this.api.save(data);
  }

  update(id:number, data: memberContent): Observable<any> {
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
