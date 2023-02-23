import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Section, sectionContent } from '../../model/section';
import { SectionData } from './section-data';
import { SectionApi } from './section.api';

@Injectable()
export class SectionService implements SectionData {

  constructor(private api: SectionApi) { }

  saveNew(data: Section): Observable<any> {
    return this.api.save(data);
  }

  search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any> {
    return this.api.search(pageNumber, pageSize, txtSearch);
  }

  save(data: sectionContent): Observable<any> {
    return this.api.save(data);
  }

  update(id:number, data: sectionContent): Observable<any> {
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
