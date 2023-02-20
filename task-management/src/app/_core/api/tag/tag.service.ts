import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tagContent } from '../../model/tag';
import { TagData } from './tag-data';
import { TagApi } from './tag.api';

@Injectable()
export class TagService implements TagData {

  constructor(private api: TagApi) { }

  search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any> {
    return this.api.search(pageNumber, pageSize, txtSearch);
  }

  save(data: tagContent): Observable<any> {
    return this.api.save(data);
  }

  update(id:number, data: tagContent): Observable<any> {
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
