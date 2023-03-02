import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { AccessToken } from './access-token';

@Injectable()
export class AuthService {

  private tokenDecode: any = {};
  private isExpiredToken: boolean = false;

  constructor() {
    let helper = new JwtHelperService();
    let token = localStorage.getItem('access_token');
    if(token) {
      this.tokenDecode = helper.decodeToken(token);
    }
    console.log(this.tokenDecode);
    this.setIsTokenExpired(this.tokenDecode);

  }
  //

  isAuthenticated(): Observable<boolean> {
    // debugger;
    if (this.tokenDecode) {
      if (this.getIsExpiredToken()) return of(false);
      return of(true);
    }
    return of(false);
  }

  getIsExpiredToken() {
    return this.isExpiredToken;
  }

  setIsTokenExpired(token: any) {
    if (token) {
      let expTime = new Date(token.exp * 1000);
      let timeout = expTime.getTime() - new Date().getTime();
      if (timeout < 0) return this.isExpiredToken = true;
      return this.isExpiredToken = false;
    } else {
      return this.isExpiredToken = true;
    }
  }

}
