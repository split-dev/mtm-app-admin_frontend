import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productsFilter'
})
export class ProductsFilterPipe implements PipeTransform {
  transform(items: any[], searchProducts: string): any[] {
    if (!searchProducts) {
      return items;
    }
    searchProducts = searchProducts.toLowerCase();

    return items.filter(item => {
      /** filtering logic: */
      return (item.name && item.name?.toLowerCase().indexOf(searchProducts) !== -1) ||
             (item.description && item.desciption?.toLowerCase().indexOf(searchProducts) !== -1);
    });
  }
}