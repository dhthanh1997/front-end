import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { teamContent } from '../../model/team';
import { TeamData } from './team-data';
import { TeamApi } from './team.api';

@Injectable()
export class TeamService implements TeamData {

  constructor(private api: TeamApi) { }

  search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any> {
    return this.api.search(pageNumber, pageSize, txtSearch);
  }

  save(data: teamContent): Observable<any> {
    return this.api.save(data);
  }

  update(id:number, data: teamContent): Observable<any> {
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
