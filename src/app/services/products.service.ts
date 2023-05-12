import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductsResponse } from '../pages/interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = `${environment.apiHost}${environment.productsEndpoint}`;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<ProductsResponse>(this.apiUrl);
  }
  getProduct(id: string) {
    return this.http.get<ProductsResponse>(`${this.apiUrl}/${id}`);
  }
}