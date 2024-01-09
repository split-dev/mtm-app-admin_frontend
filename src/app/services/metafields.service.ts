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
export class MetafieldsService {
  private apiUrl = `${environment.apiHost}${environment.metafieldsEndpoint}`;
  constructor(private http: HttpClient, private authService: AuthService) { }

  getCustomerMetafields(customerId: string) {
    return this.http.get<any>(`${this.apiUrl}/?owner_resource=customer&namespace=custom&owner_id=${customerId}`)
      .pipe(catchError((error) => {
        if (error.status === 403) {
          this.authService.logout();
        }
        return throwError(error);
      }));
  }

  createCustomerMetafields(data: any) {
    return this.http.post<any>(`${this.apiUrl}`, { data })
      .pipe(catchError((error) => {
        if (error.status === 403) {
          this.authService.logout();
        }
        return throwError(error);
      }));
  }

  updateCustomerMetafields(data: any) {
    return this.http.put<any>(`${this.apiUrl}`, { data })
      .pipe(catchError((error) => {
        if (error.status === 403) {
          this.authService.logout();
        }
        return throwError(error);
      }));
  }
}
