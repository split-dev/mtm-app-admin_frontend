import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken()?.jwtToken;

    // Если токен существует, добавьте заголовок X-AuthToken
    if (token) {
      request = request.clone({
        setHeaders: {
          'X-AuthToken': token
        }
      });
    }

    return next.handle(request);
  }
}