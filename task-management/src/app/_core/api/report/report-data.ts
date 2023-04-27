import { Observable } from "rxjs";

export abstract class ReportData {
  abstract search(txtSearch?: string, txtSort?: string): Observable<any>;
}
