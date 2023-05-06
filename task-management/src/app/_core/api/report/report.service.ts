import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportData } from './report-data';
import { ReportApi } from './report.api';

@Injectable()
export class ReportService implements ReportData {

  constructor(private api: ReportApi) { }
 

  search(txtSearch?: string, txtSort?: string): Observable<any> {
    return this.api.search(txtSearch, txtSort);
  }

  exportExcel(projectId: number): Observable<Blob> {
    return this.api.exportExcel(projectId);
  }

}
