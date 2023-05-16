import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
const USER_AUTH_LS_KEY = 'mtm_user_auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean | undefined>(undefined);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) { }

  // Функция для авторизации пользователя
  login(password: string) {
    this.http.post<any>(`${environment.apiHost}${environment.authEndpoint}`, { data: {
      password
    } }).subscribe(
      response => {
        // Если ответ от сервера содержит токен, сохраняем его в localStorage
        if (response && response.data?.jwtToken) {
          localStorage.setItem(USER_AUTH_LS_KEY, btoa(`${response.data.jwtToken}:${new Date().toDateString()}`));
          this.loggedInSubject.next(true);
          this.router.navigate(['/']);
        } else {
          throw new Error;
        }
      },
      error => {
        console.error(error);
        this.loggedInSubject.next(false);
      }
    );
  }

  logout() {
    this.loggedInSubject.next(false);
    localStorage.removeItem(USER_AUTH_LS_KEY);
    this.router.navigate(['/login']);
  }

  getToken() {
    let token = localStorage.getItem(USER_AUTH_LS_KEY);

    if (!token) {
        return { jwtToken: null, date: null };
    }

    token = atob(token);

    const jwtToken: string | undefined = token?.split(':')[0];
    const date: string | undefined = token?.split(':')[1];

    return { jwtToken, date };
  }

  // Функция для проверки авторизации пользователя
  isLoggedIn() {
    const { jwtToken, date } = this.getToken();
    const today = new Date().toDateString();

    if (!!jwtToken?.length && (date === today)) {
        return true;
    } else {
        return false;
    }
  }
}
