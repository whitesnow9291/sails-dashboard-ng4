import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StoreComponent } from './storesales.component';
import { StaffComponent } from './staffsales.component';
import { ResellerComponent } from './resellersales.component';
import { CampaigndashboardComponent } from './campaigndashboard.component';
import { CampaignlistComponent } from './campaignlist.component';
import { SalesRoutingModule } from './sales-routing.module';

// Datepicker
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// Ng2-select
import { SelectModule } from 'ng2-select';
// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { HighlightDirective } from '../shared/highlight.directive';
@NgModule({
  imports: [
    SalesRoutingModule,
    ChartsModule,
    CommonModule,
    FormsModule,
    SelectModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  declarations: [ StoreComponent, StaffComponent, ResellerComponent, HighlightDirective, CampaignlistComponent, CampaigndashboardComponent ]
})
export class SalesModule { }
