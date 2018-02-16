import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [ AuthRoutingModule, CommonModule ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
