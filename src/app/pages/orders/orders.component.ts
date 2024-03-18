import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import {OrdersService} from "../../services/orders.service";
import {Order, OrderPageInfo, OrderQueryInfo, OrdersResponse} from "../interfaces/order.interface";
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnDestroy {

  private orderQuerySubjectCustom = new Subject<OrderQueryInfo>();
  private orderQuerySubjectCustomFilter = new Subject<OrderQueryInfo>();
  private orderQuerySubjectCustomSort = new Subject<string>();
  ordersAll: Order[] = [];
  ordersAllPagination: Order[] = [];

  private orderQuerySubject = new Subject<OrderQueryInfo>();
  orders: Order[] = [];
  page_info: OrderPageInfo  = {
    endCursor: 'string',
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: 'string',
  };
  default_query_info: OrderQueryInfo  = {
    sort: '',
    reverse: 'asc',
    status: 'All Statuses',
    payment_status: 'All Statuses',
  };
  query_info: OrderQueryInfo  = {
    sort: '',
    reverse: 'asc',
    status: 'AllStatuses',
    payment_status: 'AllStatuses',
  };
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  searchCustomers: string = '';
  sortKeyOrder: string = 'Default';
  customersLoaded: boolean = false;
  openedMenuIndex: number = -1;
  openedMenuIndexPayment: number = -1;
  updateDebounceTime:number = 500
  isDropdownOpen = false;
  isDropdownOpenPayment = false;
  isHovered: number = -1;
  isHoveredPrinter: number = -1;
  ordersStatus = ['Unverified', 'Change Request', 'No Changes','Verified','Submitted','Accepted','Despatched','Complete','All Statuses'];
  ordersPaymentStatus = ['Paid', 'Authorized', 'Expired','Partially Paid','Partially Refunded','Pending','Refunded','Voided','All Statuses'];
  selectedOrdersStatus: string= '';
  selectedOrdersPaymentStatus: string= '';
  private destroy$ = new Subject<void>();

  constructor(private ordersService: OrdersService, private router: Router, private authService: AuthService,private clipboard: Clipboard) {
/*
    this.orderQuerySubject.pipe(
      debounceTime(this.updateDebounceTime),
      switchMap((value: OrderQueryInfo) => this.ordersService.getOrders(value,this.currentPage)),
      takeUntil(this.destroy$)
    ).subscribe((res: OrdersResponse) => {
      console.log('Orders pipe -> ',res)
      this.orders = res.data
      this.totalItems = res.data.length;
      this.page_info = res.page_info
      this.customersLoaded = true;
    }, (error: any) => {
      console.error('Error loading get all orders filter', error);
    });
*/

    this.orderQuerySubjectCustom.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.ordersAllPagination = this.ordersAll.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage);
      if(this.ordersAll.length > this.pageSize * this.currentPage){
        this.page_info.hasNextPage = true;
      }else {
        this.page_info.hasNextPage = false;
      }
      this.page_info.hasPreviousPage = this.pageSize * this.currentPage > this.pageSize;

      this.customersLoaded = true;
    });

    this.orderQuerySubjectCustomFilter.pipe(
      debounceTime(500),
      switchMap((value: OrderQueryInfo) => this.ordersService.getOrdersAll()),
    ).subscribe((res: OrdersResponse) => {
      this.ordersAll = res.data
      if(this.default_query_info.status!== 'All Statuses'){
        this.ordersAll = this.ordersAll.filter(value1 => value1.order_status===this.default_query_info.status);
      }

      if (this.default_query_info.payment_status!== 'All Statuses'){
        this.ordersAll = this.ordersAll.filter(value1 => value1.payment_status===this.default_query_info.payment_status);
      }

      switch (this.sortKeyOrder) {
        case 'Amount':
          this.ordersAll.sort((a,b)=>Number(b.amount)-Number(a.amount))
          break;
        case 'Order Number':
          this.ordersAll.sort((a,b)=>b.order_number_sort-a.order_number_sort)
          break;
        case 'Customer':
          this.ordersAll.sort((a, b) => {
            const nameA = a.customer_first_name.toUpperCase();
            const nameB = b.customer_first_name.toUpperCase();

            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
          break;
      }
      this.orderQuerySubjectCustom.next(this.default_query_info);
    });
    this.orderQuerySubjectCustomSort.pipe(
      debounceTime(500),
      switchMap((value:string) => this.ordersService.getOrdersAll()),
    ).subscribe((res: OrdersResponse) => {
      this.ordersAll = res.data
      if(this.default_query_info.status!== 'All Statuses'){
        this.ordersAll = this.ordersAll.filter(value1 => value1.order_status===this.default_query_info.status);
      }

      if (this.default_query_info.payment_status!== 'All Statuses'){
        this.ordersAll = this.ordersAll.filter(value1 => value1.payment_status===this.default_query_info.payment_status);
      }
      this.orderQuerySubjectCustom.next(this.default_query_info);
    });

  }

  ngOnInit() {
   /* this.ordersService.getOrders(this.query_info)
      .subscribe((res: OrdersResponse) => {
        console.log('Orders -> ',res)
        this.orders = res.data
        this.totalItems = res.data.length;
        this.page_info = res.page_info
        this.customersLoaded = true;
      }, (error: any) => {
        console.error('Error loading orders', error);
      });*/
    this.ordersService.getOrdersAll()
      .subscribe((res: OrdersResponse) => {
        this.ordersAll = res.data
        this.ordersAllPagination = this.ordersAll.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage);
        this.totalItems = res.data.length;
        if(this.ordersAll.length>this.pageSize){
          this.page_info.hasNextPage = true;
        }
        this.customersLoaded = true;
      }, (error: any) => {
        console.error('Error loading orders', error);
      });
  /*  this.orderQuerySubject.pipe(
      debounceTime(500)
    ).subscribe(value => {
      console.log('Test',value)
    });*/
  }

  toggleHover(index: number): void {
    this.isHovered = index;
  }

  resetHover(): void {
    this.isHovered = -1;
  }
  toggleHoverPrinter(index: number): void {
    this.isHoveredPrinter = index;
  }

  resetHoverPrinter(): void {
    this.isHoveredPrinter = -1;
  }
  isDropdownOpenTEST(index: number): boolean {
    return this.openedMenuIndex === index;
  }

  toggleDropdownTEST(index: number): void {
    if (this.openedMenuIndex === index) {
      this.openedMenuIndex = -1; // Закриття відкритого меню
    } else {
      this.openedMenuIndex = index; // Відкриття нового меню
    }
    this.openedMenuIndexPayment = -1;
    this.isDropdownOpenPayment = false;
  }

  isDropdownOpenPaymentStatus(index: number): boolean {
    return this.openedMenuIndexPayment === index;
  }

  toggleDropdownPaymentStatus(index: number): void {
    if (this.openedMenuIndexPayment === index) {
      this.openedMenuIndexPayment = -1; // Закриття відкритого меню
    } else {
      this.openedMenuIndexPayment = index; // Відкриття нового меню
    }
    this.openedMenuIndex = -1;
    this.isDropdownOpen = false;
  }

  openProfile(id: string) {
    const profileUrl = this.router.createUrlTree(['/customers', id]).toString();
    window.open(profileUrl, '_blank');
  }
  openOrderPrinter(id: string): void {
    window.open(`https://begyourpardon.com.au/pages/print-order/${id}`, '_blank');
  }
  selectCountry(orderStatus: string): void {
    this.selectedOrdersStatus = orderStatus;
  //  this.query_info.status=orderStatus.replaceAll(' ', '')
    this.query_info.status=orderStatus
    this.default_query_info.status=orderStatus
    this.customersLoaded = false;
    this.currentPage = 1;
    this.orderQuerySubjectCustomFilter.next(this.default_query_info)
   // this.orderQuerySubject.next(this.query_info);
  }
  selectOrderPaymentStatus(orderPaymentStatus: string): void {
    this.selectedOrdersPaymentStatus = orderPaymentStatus;
   // this.query_info.payment_status=orderPaymentStatus.replaceAll(' ', '')
    this.default_query_info.payment_status=orderPaymentStatus
    this.customersLoaded = false;
    this.currentPage = 1;
    this.orderQuerySubjectCustomFilter.next(this.default_query_info)
    //this.orderQuerySubject.next(this.query_info);
  }
  sortOrder(sortKey: string): void {
    if(this.sortKeyOrder===sortKey){
      this.sortKeyOrder='Default'
    }else {
      this.sortKeyOrder=sortKey
    }
    this.orderQuerySubjectCustomFilter.next(this.default_query_info)
    // this.orderQuerySubject.next(this.query_info);
  }

  testUpdateStatus(orderStatus: string,id:string): void {
    console.log(id,orderStatus);
    this.customersLoaded = false;
    this.openedMenuIndex = -1;
    this.openedMenuIndexPayment=-1;
    console.log(id,orderStatus);
    this.ordersService.setStatusOrderUpdate(id,{
      status:orderStatus
    })
      .subscribe((res: any) => {
        this.updateDebounceTime=1500
          // this.orderQuerySubject.next(this.query_info);
        this.orderQuerySubjectCustomFilter.next(this.default_query_info)
      }, (error: any) => {
        console.error('Error Update Payment Statu orders', error);
      });

  }
  testUpdatePaymentStatus(orderStatus: string,id:string): void {
    this.customersLoaded = false;
    this.openedMenuIndex = -1;
    this.openedMenuIndexPayment=-1;
    console.log(id,orderStatus);
    this.ordersService.setPaymentStatusOrderUpdate(id,{
        status:orderStatus
    })
      .subscribe((res: any) => {
        this.updateDebounceTime=1500
        //this.orderQuerySubject.next(this.query_info);
        this.orderQuerySubjectCustomFilter.next(this.default_query_info)
      }, (error: any) => {
        console.error('Error Update Payment Statu orders', error);
      });


    // window.location.reload();
  }
  filterOrderStatus(orderStatus: string): any [] {
    return this.ordersStatus.filter((value, index) => value!==orderStatus && value!== 'All Statuses' && value!== 'Accepted' );
  }
  filterOrderPaymentStatus(orderPaymentStatus: string): any [] {
    return this.ordersPaymentStatus.filter((value, index) => value!==orderPaymentStatus && value!== 'All Statuses' );
  }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.openedMenuIndex = -1;
    this.openedMenuIndexPayment=-1;
  }
  toggleDropdownPayment() {
    this.isDropdownOpenPayment = !this.isDropdownOpenPayment;
    this.openedMenuIndex = -1;
    this.openedMenuIndexPayment=-1;
  }


  onPageChange(page: number) {
    this.currentPage = Math.max(page, 1);
    this.customersLoaded = false;
   // this.orderQuerySubject.next(this.query_info);
    this.orderQuerySubjectCustom.next(this.query_info);
  }

  onSearchChange() {
    this.currentPage = 1;
    this.orderQuerySubject.next(this.query_info);
  }
  copyToClipboard(id: string): void {
    this.clipboard.copy( `https://begyourpardon.com.au/pages/print-order/${id}`);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
