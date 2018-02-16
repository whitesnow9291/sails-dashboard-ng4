import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { PageNotFoundComponent } from './404.component';
import { ServerErrorComponent } from './500.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sales',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'sales',
        canActivate: [AuthGuard],
        loadChildren: './sales/sales.module#SalesModule'
      },
      {
        path: 'admin',
        canActivate: [AuthGuard],
        loadChildren: './admin/admin.module#AdminModule'
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: '404',
    component: PageNotFoundComponent,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: ServerErrorComponent,
    data: {
      title: 'Page 500'
    }
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
