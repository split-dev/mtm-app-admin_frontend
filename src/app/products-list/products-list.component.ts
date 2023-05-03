import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ProductsResponse } from '../interfaces/products.interface';
import { products } from '../services/products.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  products: any[] = [];
  searchProducts: string = '';

  constructor(private productsService: ProductsService, private router: Router) { }

  openProduct(id: number) {
    this.router.navigate(['/shop/products', id]);
  }

  ngOnInit() {
    this.productsService.getProducts() /** << replace with real api */
      .subscribe((data: ProductsResponse) => {
        console.log('api data', data);

        this.products = products.products;
      });
  }
}
