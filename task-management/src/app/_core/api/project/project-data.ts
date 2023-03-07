import { Observable } from "rxjs";
import { projectContent } from "../../model/project";

export abstract class ProjectData {
  abstract search(pageNumber: number, pageSize: number, txtSearch?: string, sort?: string): Observable<any>;
  abstract addProject(data: projectContent): Observable<any>;
  abstract updateProject(id:number, data: projectContent): Observable<any>;
  abstract getProjectById(id: number): Observable<any>;
  abstract deleteProject(id: number): Observable<any>;
  abstract deleteSelectedProject(data: number[]): Observable<any>;
}
