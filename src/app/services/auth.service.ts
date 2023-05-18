import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
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
          window.localStorage.setItem(USER_AUTH_LS_KEY, btoa(`${response.data.jwtToken}:${new Date().toDateString()}`));

          this.router.navigate(['/'], {
            onSameUrlNavigation: 'reload'
          });
          this.loggedInSubject.next(true);
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
    window.localStorage.removeItem(USER_AUTH_LS_KEY);
    this.router.navigate(['/login']);
    this.loggedInSubject.next(false);
  }

  getToken() {
    let token = window.localStorage.getItem(USER_AUTH_LS_KEY);

    if (!token) {
      this.loggedInSubject.next(false);
      return { jwtToken: null, date: null };
    }

    token = atob(token);

    const jwtToken: string | undefined = token?.split(':')[0];
    const date: string | undefined = token?.split(':')[1];

    return { jwtToken, date };
  }

  // Функция для проверки авторизации пользователя
  isLoggedIn(): boolean {
    console.log('this.loggedInSubject', this.loggedInSubject, this.loggedInSubject.value);
    const token = window.localStorage.getItem(USER_AUTH_LS_KEY);

    if (token) {
      const parsedToken = atob(token);
      const jwtToken = parsedToken?.split(':')[0];
      const date = parsedToken.split(':')[1];

      const today = new Date().toDateString();
      const logged = (!!jwtToken.length && date === today);
      
      console.log('logged', token, date,logged);
      this.loggedInSubject.next(logged);
      return logged;
    }

    return false;
  }
}
