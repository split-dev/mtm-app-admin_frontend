import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import { CustomersResponse } from '../interfaces/customers.interface';
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

  constructor(private customerService: CustomersService, private router: Router, private authService: AuthService) { }

  openProfile(id: number) {
    this.router.navigate(['/customers', id]);
  }

  ngOnInit() {
    this.customerService.getCustomers()
      .subscribe((res: CustomersResponse) => {
        this.customers = res.data;
        this.customersLoaded = true;
      }, (error: any) => {
        console.error('Error loading customers', error);
      });
  }
}
