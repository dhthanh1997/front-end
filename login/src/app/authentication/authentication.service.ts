import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccessToken } from '../../../../task-management/src/app/_base/access-token';


@Injectable()
export class AuthenticationService {

  private readonly apiAuthorization: string = '';

  constructor(private http: HttpClient) {

  }

  get apiUrl() {
    return environment.apiUrl;
  }

  login(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, formData);
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }


  


}
