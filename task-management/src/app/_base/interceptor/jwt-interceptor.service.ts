import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // debugger;
    const token = localStorage.getItem('access_token');
    if (token) {
      // console.log(token);
      // if(this.authService.getIsExpiredToken()) {
      //     this.authenticationService.refreshToken();

      // } else {

      // }
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      
    };
    return next.handle(req);
  }
}
