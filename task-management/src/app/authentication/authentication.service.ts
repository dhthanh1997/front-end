import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccessToken } from '../../../../task-management/src/app/_base/access-token';


@Injectable()
export class AuthenticationService {

  // private readonly apiAuthorization: string = '/auth';

  constructor(private http: HttpClient) {

  }

  get loginUrl() {
    return environment.gatewayUrl;
  }

  login(formData: any): Observable<any> {
    return this.http.post(`${this.loginUrl}/auth/login`, formData);
  }

  refreshToken(uuid: string): Observable<any> {
    return this.http.get(`${this.loginUrl}/auth/refreshTokenClient/` + uuid);
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.loginUrl}/user`);
  }





}
