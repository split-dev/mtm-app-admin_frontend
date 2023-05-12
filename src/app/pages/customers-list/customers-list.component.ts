import { Component } from '@angular/core';

import { CustomersService } from 'src/app/services/customers.service';
import { CustomersResponse } from '../interfaces/customers.interface';
import { customers } from '../../services/customers.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent {
  customers: any[] = [];
  searchCustomers: string = '';
  customersLoaded: boolean = false;

  constructor(private customerService: CustomersService, private router: Router) { }

  openProfile(id: number) {
    this.router.navigate(['/customers', id]);
  }

  ngOnInit() {
    this.customerService.getCustomers() /** << replace with real api */
      .subscribe((res: CustomersResponse) => {
        this.customers = res.data;
        this.customersLoaded = true;
      });
  }
}
