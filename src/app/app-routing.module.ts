import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { ProfileComponent } from './profile/profile.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { ShopComponent } from './shop/shop.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './product/product.component';
import { FabricsComponent } from './fabrics/fabrics.component';
import { MeasurementsComponent } from './measurements/measurements.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'customers',
    component: CustomersComponent,
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
    path: 'shop',
    component: ShopComponent,
    pathMatch: 'prefix',
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
        path: 'fabrics',
        component: FabricsComponent
      },
      {
        path: 'measurements',
        component: MeasurementsComponent
      },
      {
        path: '',
        component: ProductsListComponent
      }
    ]
  },
  {path: '**', redirectTo: 'shop'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
