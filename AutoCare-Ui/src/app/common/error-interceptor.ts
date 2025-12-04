import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {
  }

  intercept(req: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    let authReq = req;
    if (this.authService.isTokenValid()) {
      authReq = this.addTokenHeader(req, this.authService.getToken());
    }

    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes('login') && (error.status === 401 || error.status === 403)) {
        return this.handle401Error(authReq, next);
      }
      return throwError(() => new Error('Unauthorized - logged out'));
    }));
  }

  private handle401Error(_: HttpRequest<object>, _2: HttpHandler): Observable<HttpEvent<object>> {
    this.authService.logout();
    return throwError(() => new Error('Unauthorized - logged out'));
  }

  private addTokenHeader(request: HttpRequest<object>, token: string) {
    if (!token || request.url.indexOf('/auth/authentication') > -1) {
      return request;
    }
    return request.clone({headers: request.headers.set('authorization', token)});
  }
}
