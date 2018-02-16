import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { CreateComponent } from './create.component';
import { UpdateComponent } from './update.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    ChartsModule
  ],
  declarations: [ AdminComponent, CreateComponent, UpdateComponent ]
})
export class AdminModule { }
