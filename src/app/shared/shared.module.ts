import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from '../app-routing.module';
import {MatStepperModule} from '@angular/material/stepper';

const commonMat =[
  MatToolbarModule,
  MatButtonToggleModule,
  MatRadioModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatStepperModule
]

@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    commonMat,
    AppRoutingModule
  ],
  exports: [NavBarComponent,commonMat]
})
export class SharedModule { }
