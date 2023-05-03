import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { NavComponent } from './nav/nav.component';
import { LayoutComponent } from './layout/layout.component';
import { CustomersFilterPipe } from './customers/customers.filter.pipe';
import { ProductsFilterPipe } from './shop/products.filter.pipe';
import { ProfileComponent } from './profile/profile.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { ShopComponent } from './shop/shop.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './product/product.component';
import { FabricsComponent } from './fabrics/fabrics.component';
import { MeasurementsComponent } from './measurements/measurements.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CustomersComponent,
    NavComponent,
    CustomersFilterPipe,
    ProductsFilterPipe,
    ProfileComponent,
    CustomersListComponent,
    ShopComponent,
    ProductsListComponent,
    ProductComponent,
    FabricsComponent,
    MeasurementsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutComponent,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
