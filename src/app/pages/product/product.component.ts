import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product, suitType } from '../interfaces/products.interface';
import { products } from '../../services/products.data';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  productId: string | null = '';
  product: Product | undefined = undefined;
  productSuitTypes: suitType[] = ['blazer', '2-piece suit', '3-piece suit', '2-trouser suit', '2-piece formal', '3-piece formal', 'overcoat', 'trouser'];

  constructor(private productsService: ProductsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.productsService.getProduct('9') /** << replace with real id and real api */
        .subscribe((data) => {
          this.product = products.products.find((p) => p.id.toString() === this.productId);
          console.log('this.product ', this.product);
        });
    }
  }
}
