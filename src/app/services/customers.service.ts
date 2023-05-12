import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CustomersResponse } from '../pages/interfaces/customers.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private apiUrl = `${environment.apiHost}${environment.customersEndpoint}`;
  private authToken = this.authService.getToken();
  private generateAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-AuthToken': this.authToken.jwtToken || ''
    });
  }

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCustomers() {
    const headers = this.generateAuthHeaders();
    return this.http.get<CustomersResponse>(this.apiUrl, { headers });
  }
  getCustomer(id: string) {
    const headers = this.generateAuthHeaders();
    return this.http.get<CustomersResponse>(`${this.apiUrl}/${id}`, { headers });
  }
}