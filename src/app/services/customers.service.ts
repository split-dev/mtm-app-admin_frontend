import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CustomerResponse } from './customers.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private apiUrl = `${environment.apiHost}${environment.customersEndpoint}`;

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get<CustomerResponse>(this.apiUrl);
  }
}