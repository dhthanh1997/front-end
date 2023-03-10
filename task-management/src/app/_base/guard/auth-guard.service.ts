import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(private authService: AuthService, private router: Router) {
  }

  // get loginUrl(): string {
  //   return environment.loginUrl;
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isAuthenticated().pipe(
      tap((authenticated) => {
          // if(!authenticated) {
          //   // window.location.href = this.loginUrl;
          //   this.router.navigate(['auth/login']);
          // }
      })
    )
  }
}
