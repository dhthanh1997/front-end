/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { projectContent } from '../../model/project';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { ProjectApi } from './project.api';


@Injectable()
export class ProjectService {
  constructor(private http: HttpClient, private i18n: NzI18nService, private api: ProjectApi) {}

  switchLanguage() {
    this.i18n.setLocale(en_US);
  }

  public search(
    pageNumber: number,
    pageSize: number,
    txtSearch?: string,
    sort?: string
  ): Observable<any> {
    // return this.http.get(
    //   `${url}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${txtSearch}`
    // );
    return this.api.search(pageNumber, pageSize, txtSearch, sort);
  }

  public addProject(project: projectContent): Observable<any> {
    return this.api.save(project);
  }

  public getProjectById(id: number): Observable<any> {
    return this.api.getById(id);
  }

  public updateProject(id: number, project: projectContent): Observable<any> {
    return this.api.update(id, project);
  }

  public deleteProject(id: number): Observable<any> {
    return this.api.deleteById(id);
  }

  public deleteSelectedProject(ListId: number[]): Observable<any> {
    return this.api.deleteSelectedId(ListId);
  }
}
