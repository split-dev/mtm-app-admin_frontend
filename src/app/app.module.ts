import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { NavComponent } from './nav/nav.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductsFilterPipe } from './pages/shop/products.filter.pipe';
import { ProfileComponent } from './pages/profile/profile.component';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductComponent } from './pages/product/product.component';
import { FabricsComponent } from './pages/fabrics/fabrics.component';
import { MeasurementsComponent } from './pages/measurements/measurements.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { OrdersComponent } from './pages/orders/orders.component';

declare global {
  interface Window {
    bootstrap: any; /** for calling Bootstrap js ui features */
  }
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CustomersComponent,
    NavComponent,
    ProductsFilterPipe,
    ProfileComponent,
    CustomersListComponent,
    ShopComponent,
    ProductsListComponent,
    ProductComponent,
    FabricsComponent,
    MeasurementsComponent,
    LoginComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutComponent,
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
