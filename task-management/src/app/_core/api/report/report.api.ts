
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/_base/http.service';

@Injectable()
export class ReportApi {

  private readonly apiController: string = 'report';

  constructor(private http: HttpService) { }

  search(txtSearch?: string, txtSort?: string): Observable<any> {
    return this.http.get(
      `${this.apiController}?search=${txtSearch}&?sort=${txtSort}`
    );
  }

  exportExcel(projectId: number): Observable<Blob> {
    const params = new HttpParams().set('projectId', projectId);
    // return this.http.post(`${this.apiController}/exportExcel?projectId=${projectId}`,{});
    return this.http.post(`${this.apiController}/exportExcel`, {}, { params, responseType: 'blob' });

  }

}
