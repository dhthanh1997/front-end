import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {


  constructor(private router: Router, private authService: AuthService) { }

 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error: any) => {
      console.log(error)
      if(error.status === 401) {
        
        if(this.authService.getIsExpiredToken()){
           
        } 
        this.router.navigate(['auth/login']);
       
      }
      return throwError(() => new Error(error.message));
    }));
  }
}
