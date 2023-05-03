import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { Customer } from '../interfaces/customers.interface';
import { customers } from '../services/customers.data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  customerId: string | null = '';
  customer: Customer | undefined = undefined;

  constructor(private customerService: CustomersService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('id');

    if (this.customerId) {
      this.customerService.getCustomer('1') /** << replace with real id and real api */
        .subscribe((data) => {
          this.customer = customers.customers.find((c) => c.id.toString() === this.customerId);
        });
    }
  }
}
