import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  public isCollapsed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  constructor(private router: Router) {
    //do something
  }

  inItMenu() {
    // do something;
  }

  public logOut() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
