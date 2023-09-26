import { HttpClientModule } from '@angular/common/http';
import { StudentModule } from './student/student.module';
import { DoctorModule } from './doctor/doctor.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
      // BrowserModule,
      BrowserAnimationsModule,
      DoctorModule,
      StudentModule,
      AuthModule,
      SharedModule,
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      HttpClientModule,
      ToastrModule.forRoot()
    ]
})
export class AppModule { }
