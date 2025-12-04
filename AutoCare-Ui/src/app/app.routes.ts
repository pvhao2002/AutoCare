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
        path: 'services',
        loadComponent: () => import('./service/service.component').then(m => m.ServiceComponent)
      },
      {
        path: 'customers',
        loadComponent: () => import('./customer/customer.component').then(m => m.CustomerComponent)
      },
      {
        path: 'invoices',
        loadComponent: () => import('./invoice/invoice.component').then(m => m.InvoiceComponent)
      }
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
