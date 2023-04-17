import { Observable } from "rxjs";

export abstract class UserData {
  abstract getUserInfo(usrename: string): Observable<any>;
}
