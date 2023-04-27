import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, from, of } from 'rxjs';
import { AccessToken } from './access-token';

@Injectable()
export class AuthService {

  private tokenDecode: any = {};
  private isExpiredToken: boolean = false;
  private isExpiredRefreshToken: boolean = false;

  constructor() {
    let helper = new JwtHelperService();
    let token = localStorage.getItem('access_token');
    if(token) {
      this.tokenDecode = helper.decodeToken(token);
    }
    console.log(this.tokenDecode);
    this.setIsExpiredToken(this.tokenDecode);

  }
  //

  isAuthenticated(): Observable<boolean> {
    // debugger;
    if (this.tokenDecode) {
      if (this.checkTokenExpired(this.tokenDecode)) return from([false]);
      return from([true]);
    }
    return from([false]);
  }

  getIsExpiredToken() {
    return this.isExpiredToken;
  }

  getUUID() {
    return this.tokenDecode.uuid;
  }

  checkTokenExpired(token: any) {
    if (token && token.exp) {
      let expTime = new Date(token.exp * 1000);
      let timeout = expTime.getTime() - new Date().getTime();
      if (timeout < 0) return this.isExpiredToken = true;
      return this.isExpiredToken = false;
    } else {
      return this.isExpiredToken = true;
    }
  }

  setIsExpiredToken(token: any) {
    if (token && token.exp) {
      let expTime = new Date(token.exp * 1000);
      let timeout = expTime.getTime() - new Date().getTime();
      if (timeout < 0) return this.isExpiredToken = true;
      return this.isExpiredToken = false;
    } else {
      return this.isExpiredToken = true;
    }
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

}
