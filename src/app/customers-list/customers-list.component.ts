import { Component } from '@angular/core';

import { CustomersService } from 'src/app/services/customers.service';
import { CustomersResponse } from '../services/customers.interface';
import { customers } from '../services/customers.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent {
  customers: any[] = [];
  searchCustomers: string = '';

  constructor(private customerService: CustomersService, private router: Router) { }

  openProfile(id: number) {
    this.router.navigate(['/customers', id]);
  }

  ngOnInit() {
    this.customerService.getCustomers() /** << replace with real api */
      .subscribe((data: CustomersResponse) => {
        console.log('api data', data);

        this.customers = customers.customers;
      });
  }
}
