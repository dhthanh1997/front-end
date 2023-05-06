import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, retry, take, tap, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { AuthService } from '../auth.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // debugger;
    const token = localStorage.getItem('access_token');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

    };
    // return next.handle(req);
    return next.handle(req)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          // console.log(error.message);
          // if (error.error instanceof ErrorEvent) {
              if(error.status === 401) {
                if(this.authService.checkTokenExpired(token)) {
                  let uuid = this.authService.getUUID();
                  if (uuid) { 
                    this.authenticationService.refreshToken(uuid).pipe(take(1)).subscribe({
                      next: (res) => {
                        if (res && res.accessToken) {
                          console.log(res);
                          localStorage.setItem('access_token', res.accessToken);
                        }
                      },
                      error: (error) => {
                        console.log(error);
                        // nếu trả về 401 từ refreshToken => refreshToken hết hạn => redirect sang login
                        this.router.navigate(['auth/login']);
                      }
                    });
                  } else {
                    this.router.navigate(['auth/login']);
                  }
                } 
              // }
          }
          return throwError(() => error);
        })
       
      )
      ;
  }
}
