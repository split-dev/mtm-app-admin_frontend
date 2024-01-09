import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import {CustomerPageInfo, CustomersResponse} from '../interfaces/customers.interface';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import {OrderPageInfo} from "../interfaces/order.interface";


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnDestroy {
  customers: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  searchCustomers: string = '';
  customersLoaded: boolean = false;
  page_info: CustomerPageInfo  = {
    next: false,
    prev: false,
  };

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private customerService: CustomersService, private router: Router, private authService: AuthService) {
    // this.searchSubject.pipe(
    //   debounceTime(300),
    //   switchMap((searchValue: string) => this.customerService.getCustomers(searchValue, this.currentPage, this.pageSize)),
    //   takeUntil(this.destroy$)
    // ).subscribe((res: CustomersResponse) => {
    //   console.log('3',res.data)
    //   this.customers = res.data.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage);
    //   this.totalItems = res.data.length;
    //   this.customersLoaded = true;
    // }, (error: any) => {
    //   console.error('Error loading customers', error);
    // });

    this.searchSubject.pipe(
      debounceTime(300),
      switchMap((searchValue: string) => this.customerService.getCustomers(searchValue, this.currentPage, this.pageSize)),
      takeUntil(this.destroy$)
    ).subscribe((res: CustomersResponse) => {
      console.log('getCustomers Pagination',res)
      this.customers = res.data
      this.page_info = res.page_info;
      this.totalItems = res.data.length;
      this.customersLoaded = true;
    }, (error: any) => {
      console.error('Error loading customers', error);
    });
  }

  openProfile(id: number) {
    this.router.navigate(['/customers', id]);
  }

  ngOnInit() {
  /*  this.customerService.getCustomers(this.searchCustomers)
      .subscribe((res: CustomersResponse) => {
        console.log(res.data)
        this.customers = res.data.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage);
        this.totalItems = res.data.length;
        this.customersLoaded = true;
      }, (error: any) => {
        console.error('Error loading customers', error);
      });*/
    this.customerService.getCustomers(this.searchCustomers,this.currentPage,this.pageSize)
      .subscribe((res: CustomersResponse) => {
        console.log(res)
        this.customers = res.data;
        this.totalItems = res.data.length;
        this.page_info=res.page_info;
        this.customersLoaded = true;
      }, (error: any) => {
        console.error('Error loading customers', error);
      });
  }

  onPageChange(page: number) {
    this.currentPage = Math.max(page, 1);
    this.searchSubject.next(this.searchCustomers);
  }

  onSearchChange() {
    this.currentPage = 1;
    this.searchSubject.next(this.searchCustomers);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
