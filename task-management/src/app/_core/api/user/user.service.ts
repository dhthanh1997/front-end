import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from './user-data';
import { UserApi } from './user.api';

@Injectable()
export class UserService implements UserData {

  constructor(private api: UserApi) { }
  
  getUserInfo(username: string): Observable<any> {
      return this.api.getUserInfo(username);
  }



 
}
