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

  getCustomers(search?: string) {
    return this.http.get<CustomersResponse>(`${this.apiUrl}${search ? '?search='+search : ''}`).pipe(catchError((error) => {
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
}