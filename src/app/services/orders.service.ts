import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {OrderQueryInfo, OrdersResponse} from "../pages/interfaces/order.interface";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = `${environment.apiHost}${environment.orderEndpoint}`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getOrders(query: OrderQueryInfo, page: number = 1, limit: number = 10) {
    console.log('page', page);
    console.log('limit', limit);
    console.log('Query',query)
    return this.http.get<OrdersResponse>(`${this.apiUrl}/list?limit=${limit}&page=${page}&status=${query.status}&payment_status=${query.payment_status}`).pipe(catchError((error) => {
      if (error.status === 403) {
        this.authService.logout();
      }
      return throwError(error);
    }));
  }
  getOrdersAll() {
    return this.http.get<OrdersResponse>(`${this.apiUrl}/all/list`).pipe(catchError((error) => {
      if (error.status === 403) {
        this.authService.logout();
      }
      return throwError(error);
    }));
  }
  setStatusOrderUpdate(id: string, data: Object) {
    return this.http.post<any>(`${this.apiUrl}/custom-status/update/${id}`, { data }).pipe(catchError((error) => {
      if (error.status === 403) {
        this.authService.logout();
      }
      return throwError(error);
    }));
  }
  setPaymentStatusOrderUpdate(id: string, data: Object) {
    return this.http.post<any>(`${this.apiUrl}/custom-payment-status/update/${id}`, { data }).pipe(catchError((error) => {
      if (error.status === 403) {
        this.authService.logout();
      }
      return throwError(error);
    }));
  }
/*  getCustomer(id: string) {
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
  }*/
}
