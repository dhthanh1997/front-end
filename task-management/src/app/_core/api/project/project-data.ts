import { Observable } from "rxjs";
import { projectContent } from "../../model/project";

export abstract class ProjectData {
  abstract search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any>;
  abstract save(data: projectContent): Observable<any>;
  abstract update(id:number, data: projectContent): Observable<any>;
  abstract getById(id: number): Observable<any>;
  abstract deleteById(id: number): Observable<any>;
  abstract deleteSelectedId(data: number[]): Observable<any>;
}
