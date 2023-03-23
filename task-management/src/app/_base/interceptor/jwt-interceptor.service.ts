import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // debugger;
    const token = localStorage.getItem('access_token');
    if (token) {
      // console.log(token);
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    };
    return next.handle(req);
  }
}
