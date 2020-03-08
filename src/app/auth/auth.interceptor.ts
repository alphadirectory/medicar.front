import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();
    if (token) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`
        }
      });
      return next.handle(authReq)
        .pipe(catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.authService.logOut();
              this.router.navigateByUrl('/login');
            }
          }
          return throwError(err);
        }));
    }
    return next.handle(request);
  }
}
