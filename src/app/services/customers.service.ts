import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CustomersResponse } from '../interfaces/customers.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private apiUrl = `${environment.apiHost}${environment.customersEndpoint}`;

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get<CustomersResponse>(this.apiUrl);
  }
  getCustomer(id: string) {
    return this.http.get<CustomersResponse>(`${this.apiUrl}/${id}`);
  }
}