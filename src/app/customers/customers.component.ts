import { Component } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import { CustomerResponse } from '../services/customers.interface';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  customers: any[] = [];

  constructor(private customerService: CustomersService) { }

  ngOnInit() {
    this.customerService.getCustomers()
      .subscribe((data: CustomerResponse) => {
        this.customers = data.results;
      });
  }
}
