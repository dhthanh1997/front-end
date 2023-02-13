import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sectionContent } from './section';

const urlSection = 'http://10.2.6.142:8092/taskManagement/api/section';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  constructor(private http: HttpClient) {}

  public getSection(
    pageNumber: number,
    pageSize: number,
    txtSearch?: string
  ): Observable<any> {
    return this.http.get(
      `${urlSection}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${txtSearch}`
    );
  }

  public addSection(section: sectionContent): Observable<any> {
    return this.http.post(urlSection, section);
  }

  public getSectionById(id: number): Observable<any> {
    return this.http.get(`${urlSection}/${id}`);
  }

  public updateSection(id: number, section: sectionContent): Observable<any> {
    return this.http.put(`${urlSection}/${id}`, section);
  }

  public deleteSection(id: number): Observable<any> {
    return this.http.delete(`${urlSection}/${id}`);
  }

  public deleteSelectedSection(ListId: number[]): Observable<any> {
    return this.http.post(`${urlSection}/deleteByListId`, ListId);
  }
}
