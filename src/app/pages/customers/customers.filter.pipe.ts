import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class CustomersFilterPipe implements PipeTransform {
  transform(items: any[], searchCustomers: string): any[] {
    if (!searchCustomers) {
      return items;
    }
    searchCustomers = searchCustomers.toLowerCase();

    return items.filter(item => {
      /** filtering logic: */
      return (item.first_name && item.first_name?.toLowerCase().indexOf(searchCustomers) !== -1) ||
             (item.last_name && item.last_name?.toLowerCase().indexOf(searchCustomers) !== -1) || 
             (item.email && item.email?.toLowerCase().indexOf(searchCustomers) !== -1) ||
             (item.phone && item.phone?.toLowerCase().indexOf(searchCustomers) !== -1);
    });
  }
}