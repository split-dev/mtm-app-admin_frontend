import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { ProfileComponent } from './profile/profile.component';
import { CustomersListComponent } from './customers-list/customers-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
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
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
