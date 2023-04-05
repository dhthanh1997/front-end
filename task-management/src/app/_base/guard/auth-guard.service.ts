import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription, debounceTime, firstValueFrom, take, tap, timer } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  private $unSub: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router, private activateRoute: ActivatedRoute, private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isAuthenticated().pipe(debounceTime(1000), take(1),
      tap(async (authenticated) => {
        if (!authenticated) {
          console.log(authenticated);
          // window.location.href = this.loginUrl;
          if (this.authService.getIsExpiredToken()) {
            console.log("--get token");

            let uuid = this.authService.getUUID();
            if (uuid) {

              let res: any = await firstValueFrom(this.authenticationService.refreshToken(uuid));

              if (res && res.accessToken) {
                console.log(this.router.url);
                localStorage.setItem('access_token', res.accessToken);

                setTimeout(() => {

                 this.router.navigate(['pages']);
                }, 300);

                // this.$unSub.unsubscribe();

              } else {
                console.log(res)
                if (res && res.status === 401) {
                  this.router.navigate(['auth/login']);
                }
              }

              // this.authenticationService.refreshToken(uuid).pipe(take(1)).subscribe({
              //   next: (res) => {
              //     if (res && res.accessToken) {
              //       console.log(res);
              //       localStorage.setItem('access_token', res.accessToken);

              //       setTimeout(() => {
              //         this.router.navigate(['pages']);
              //       }, 300);
              //       // timer(300).pipe(take(1)).subscribe(res => {
              //       //   // console.log(this.activateRoute.snapshot);

              //       // });
              //       // redirect sang task
              //       // window.location.href = this.taskUrl;

              //     } else {
              //       if (res && res.status === 401) {
              //         this.router.navigate(['auth/login']);
              //       }
              //     }
              //   },
              // })
            }
            else {
              this.router.navigate(['auth/login']);
            }

          }
          // else {
          //   this.router.navigate(['auth/login']);

          // }
        }
      })
    )
  }
}
