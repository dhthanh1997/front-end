import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap, timer } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(private authService: AuthService, private router: Router, private activateRoute: ActivatedRoute, private authenticationService: AuthenticationService) {
  }

  // get loginUrl(): string {
  //   return environment.loginUrl;
  // }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isAuthenticated().pipe(
      tap((authenticated) => {
        if (!authenticated) {

          // window.location.href = this.loginUrl;
          if (this.authService.getIsExpiredToken()) {
            let uuid = this.authService.getUUID();
            if (uuid) {
              this.authenticationService.refreshToken(uuid).subscribe({
                next: (res) => {
                  if (res && res.accessToken) {
                    // console.log(this.taskUrl);
                    localStorage.setItem('access_token', res.accessToken);
                    timer(300).subscribe(res => {
                      this.router.navigate([this.activateRoute.snapshot])
                    });
                    // redirect sang task
                    // window.location.href = this.taskUrl;

                  } else {
                    if (res && res.status === 401) {
                      this.router.navigate(['auth/login']);
                    }
                  }
                },
              })
            } 
            // else {
            //   this.router.navigate(['auth/login']);
            // }

          }
          // else {
          //   this.router.navigate(['auth/login']);

          // }
        }
      })
    )
  }
}
