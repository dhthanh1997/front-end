import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/_base/http.service';

@Injectable()
export class UserApi {

  private readonly apiController: string = 'userInfo';

  constructor(private http: HttpService) { }

  getUserInfo(username: string): Observable<any> {
    return this.http.get(`${this.apiController}/${username}`);
  }

  

}
