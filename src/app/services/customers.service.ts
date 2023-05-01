import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CustomerResponse } from './customers.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private apiUrl = `${environment.apiHost}customers.json`;

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get<CustomerResponse>(this.apiUrl);
  }
}