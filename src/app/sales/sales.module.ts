import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StoreComponent } from './storesales.component';
import { ResellerComponent } from './resellersales.component';
import { SalesRoutingModule } from './sales-routing.module';

import { HighlightDirective } from '../shared/highlight.directive';
@NgModule({
  imports: [
    SalesRoutingModule,
    ChartsModule,
    CommonModule,
    FormsModule
  ],
  declarations: [ StoreComponent, ResellerComponent, HighlightDirective ]
})
export class SalesModule { }
