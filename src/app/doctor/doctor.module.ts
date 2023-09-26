import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewExamComponent } from './components/new-exam/new-exam.component';
import { SubjectComponent } from './components/subject/subject.component';
import { HisStudentComponent } from './components/his-student/his-student.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    NewExamComponent,
    SubjectComponent,
    HisStudentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ]
})
export class DoctorModule { }
