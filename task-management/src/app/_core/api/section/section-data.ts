import { Observable } from "rxjs";
import { sectionContent } from "../../model/section";

export abstract class SectionData {
  abstract search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any>;
  abstract save(data: sectionContent): Observable<any>;
  abstract update(id:number, data: sectionContent): Observable<any>;
  abstract getById(id: number): Observable<any>;
  abstract deleteById(id: number): Observable<any>;
  abstract deleteSelectedId(data: number[]): Observable<any>;
}
