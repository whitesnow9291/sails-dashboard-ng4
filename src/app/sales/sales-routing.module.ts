import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreComponent } from './storesales.component';
import { ResellerComponent } from './resellersales.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'store',
    pathMatch: 'full',
  },
  {
    path: 'store',
    component: StoreComponent,
    data: {
      title: 'Store sales'
    }
  },
  {
    path: 'reseller',
    component: ResellerComponent,
    data: {
      title: 'Reseller sales'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {}
