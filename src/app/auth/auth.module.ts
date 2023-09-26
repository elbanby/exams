import { ReactiveFormsModule } from '@angular/forms';
import { AppModule } from './../app.module';
import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './../app-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
