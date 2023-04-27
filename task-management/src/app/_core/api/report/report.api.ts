
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/_base/http.service';

@Injectable()
export class ReportApi {

  private readonly apiController: string = 'report';

  constructor(private http: HttpService) { }

  search(txtSearch?: string, txtSort?: string): Observable<any> {
    // let params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
    return this.http.get(
      `${this.apiController}?search=${txtSearch}&?sort=${txtSort}`
    );
  }

}
