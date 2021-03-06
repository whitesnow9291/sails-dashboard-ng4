import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreComponent } from './storesales.component';
import { StaffComponent } from './staffsales.component';
import { ResellerComponent } from './resellersales.component';
import { CampaigndashboardComponent } from './campaigndashboard.component';
import { CampaignlistComponent } from './campaignlist.component';

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
    path: 'staff',
    component: StaffComponent,
    data: {
      title: 'Staff sales'
    }
  },
  {
    path: 'reseller',
    component: ResellerComponent,
    data: {
      title: 'Reseller sales'
    }
  },
  {
    path: 'campaigndashboard',
    component: CampaigndashboardComponent,
    data: {
      title: 'Campaign Dashboard'
    }
  },
  {
    path: 'campaignlist',
    component: CampaignlistComponent,
    data: {
      title: 'Campaign List'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {}
