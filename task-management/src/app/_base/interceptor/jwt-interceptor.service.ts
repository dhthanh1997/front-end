import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
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
    return next.handle(req)
      .pipe(map((res: any) => {
        // console.log(res);
        return res;
      }), catchError((error: HttpErrorResponse) => {
        console.log(error);
        
        if (error.error instanceof ErrorEvent) {
            console.log(error.error.message);
            console.log(error.error);

        }
        // console.log(error.error);
        return throwError(() => new Error(error.error));
      }))
      ;
  }
}
