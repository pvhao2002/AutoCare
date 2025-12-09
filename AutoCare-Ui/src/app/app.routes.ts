import {Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {profileResolver} from "./common/user.service";
import {AuthGuard} from "./common/auth.guard";

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    resolve: [profileResolver],
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'customers',
        loadComponent: () => import('./customer/customer.component').then(m => m.CustomerComponent)
      },
      {
        path: 'invoices',
        loadComponent: () => import('./invoice/invoice.component').then(m => m.InvoiceComponent)
      },
      {
        path: 'employees',
        loadComponent: () => import('./employee/employee.component').then(m => m.EmployeeComponent)
      },
      {
        path: 'branches',
        loadComponent: () => import('./branch/branch.component').then(m => m.BranchComponent)
      },
      {
        path: 'stock',
        loadComponent: () => import('./stock/stock.component').then(m => m.StockComponent)
      },
      {
        path: 'materials',
        loadComponent: () => import('./material/material.component').then(m => m.MaterialComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'booking',
        loadComponent: () => import('./booking/booking.component').then(m => m.BookingComponent)
      },
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
