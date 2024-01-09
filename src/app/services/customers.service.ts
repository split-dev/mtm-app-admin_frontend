import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CustomerResponse, CustomersResponse } from '../pages/interfaces/customers.interface';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private apiUrl = `${environment.apiHost}${environment.customersEndpoint}`;

  constructor(private http: HttpClient, private authService: AuthService) { }

/*  getCustomers(search?: string, page: number = 1, limit: number = 10) {
    console.log('page', page);
    console.log('limit', limit);
    console.log('search',search)
    return this.http.get<CustomersResponse>(`${this.apiUrl}?limit=${page * limit}${search ? '&search='+search : ''}`).pipe(catchError((error) => {
      if (error.status === 403) {
        this.authService.logout();
      }
      return throwError(error);
    }));
  }*/
  getCustomers(search?: string, page: number = 1, limit: number = 10) {
    return this.http.get<CustomersResponse>(`${this.apiUrl}?limit=${limit}&page=${page}${search ? '&search='+search : ''}`).pipe(catchError((error) => {
      if (error.status === 403) {
        this.authService.logout();
      }
      return throwError(error);
    }));
  }

  getCustomer(id: string) {
    return this.http.get<CustomerResponse>(`${this.apiUrl}/${id}`).pipe(catchError((error) => {
      if (error.status === 403) {
        this.authService.logout();
      }
      return throwError(error);
    }));
  }
  setCustomer(id: string, data: Object) {
    return this.http.put<CustomerResponse>(`${this.apiUrl}/${id}`, { data }).pipe(catchError((error) => {
      if (error.status === 403) {
        this.authService.logout();
      }
      return throwError(error);
    }));
  }
}
