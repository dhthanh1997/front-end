import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription, debounceTime, firstValueFrom, from, map, of, take, tap, timer } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  private $unSub: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router, private activateRoute: ActivatedRoute, private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isAuthenticated().pipe(map(authenticated => {
      let item: any = {
        reAuthenticated: true,
        isRefresh: true
      };
      if (!authenticated) {
        if (this.authService.getIsExpiredToken()) {
          let uuid = this.authService.getUUID();
          if (uuid) {
            this.authenticationService.refreshToken(uuid).pipe(take(1)).subscribe({
              next: (res) => {
                if (res && res.accessToken) {
                  console.log(res);
                  localStorage.setItem('access_token', res.accessToken);
                  item.reAuthenticated = true;
                  item.isRefresh = true;
                }
              },
              error: (error) => {
                console.log(error);
                // nếu trả về 401 từ refreshToken => refreshToken hết hạn => redirect sang login
                item.reAuthenticated = false;
                item.isRefresh = true;
              }
            });
            // return of(reAuthenticated);
          }
          else {
            item.reAuthenticated = false;
            item.isRefresh = false;
          }
        }
      }
      return item;
    }), tap((value: any) => {
      if (value.isRefresh) {
          // refresh token hết hạn => redirect sang login
          if(!value.reAuthenticated) {
              this.router.navigate(['auth/login']);
              return;
          } else {
            console.log(this.router.url);
          }
      } else {
        this.router.navigate(['auth/login']);
        return;
      }
    }));
  }
}
