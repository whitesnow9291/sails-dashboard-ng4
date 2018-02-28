import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ AuthRoutingModule, CommonModule, FormsModule ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
