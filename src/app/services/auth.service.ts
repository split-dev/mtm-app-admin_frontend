import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
const USER_AUTH_LS_KEY = 'mtm_user_auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private router: Router) { }

  // Функция для авторизации пользователя
  login(username: string, password: string) {
    // Здесь должна быть логика проверки имени пользователя и пароля в вашей системе
    if (username === 'myuser' && password === 'mypassword') {
      // Если проверка прошла успешно, установить состояние loggedIn в true и перенаправить на страницу по умолчанию
      this.loggedInSubject.next(true);
      this.router.navigate(['/']);
      /** add here authToken from Cookies!!! */
      localStorage.setItem(USER_AUTH_LS_KEY, btoa(`${username}:${new Date().toDateString()}`));
    } else {
        this.loggedInSubject.next(false);
    }
  }

  logout() {
    this.loggedInSubject.next(false);
    localStorage.removeItem(USER_AUTH_LS_KEY);
    this.router.navigate(['/login']);
  }

  // Функция для проверки авторизации пользователя
  isLoggedIn() {
    let token = localStorage.getItem(USER_AUTH_LS_KEY);

    if (!token) {
        return false;
    }

    token = atob(token);

    const today = new Date().toDateString();
    const username: string | undefined = token?.split(':')[0];
    const date: string | undefined = token?.split(':')[1];

    if (!!username?.length && (date === today)) {
        this.loggedInSubject.next(true);
        return true;
    } else {
        this.loggedInSubject.next(false);
        return false;
    }
  }
}
