import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// url cua gateway
// const urlGateway = "http://localhost:8051/authorization";
// const url = 'http://10.2.6.142:9200/api';

@Injectable()
export class AuthenticationService {

  private readonly apiAuthorization: string = 'authentication';

  constructor(private http: HttpClient) {
    // do something here
  }

  get apiUrl() {
    return environment.apiUrl;
  }

  login(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${this.apiAuthorization}/login`, formData);
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }


}
