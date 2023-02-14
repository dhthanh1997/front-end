import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// url cua gateway
const urlGateway = "http://localhost:8051/authorization";
const url = 'http://10.2.6.142:9200/api';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {
    // do something here
  }

  login(formData: any): Observable<any> {
    return this.http.post(url + '/auth', formData);
  }

  getUser(id: string): Observable<any> {
    return this.http.get(url + '/user/' + id);
  }
}
