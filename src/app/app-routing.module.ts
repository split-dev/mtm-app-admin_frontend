import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductComponent } from './pages/product/product.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import {OrdersComponent} from "./pages/orders/orders.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'customers',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuard],
    children:  [
      {
        path: ':id',
        component: ProfileComponent
      },
      {
        path: '',
        pathMatch: 'full',
        component: CustomersListComponent
      }
    ]
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'shop',
    component: ShopComponent,
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    children:  [
      {
        path: 'products',
        children:  [
          {
            path: '',
            component: ProductsListComponent
          },
          {
            path: ':id',
            component: ProductComponent
          }
        ]
      },
      {
        path: '',
        component: ProductsListComponent
      }
    ]
  },
  {path: '**', redirectTo: 'customers'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
