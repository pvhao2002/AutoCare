import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  token!: string;

  constructor(private authService: AuthenticationService) {
    this.authService.getCurrentUser().subscribe({
      next: (user: any) => (this.token = user.token)
    });
  }

  intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    if (this.token) {
      request = request.clone({
        setHeaders: {
          authorization: this.authService.getToken()
        }
      });
    }

    return next.handle(request);
  }
}
