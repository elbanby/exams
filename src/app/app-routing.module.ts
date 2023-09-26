import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectComponent } from './doctor/components/subject/subject.component';
import { NewExamComponent } from './doctor/components/new-exam/new-exam.component';
import { ExamComponent } from './student/components/exam/exam.component';
import { HisStudentComponent } from './doctor/components/his-student/his-student.component';
import { AuthGuard } from './core/gurds/auth.guard';
import { AllowdDoctorGuard } from './core/gurds/allowd-doctor.guard';
import { AllowedStudentsGuard } from './core/gurds/allowed-students.guard';
const routes: Routes = [
  { path: '', component:SubjectComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'subject', component: SubjectComponent , canActivate:[AuthGuard]},
  { path: 'newExam', component: NewExamComponent , canActivate:[AllowdDoctorGuard ]},
  { path: 'exam/:id', component: ExamComponent , canActivate:[AuthGuard]},
  { path: 'student', component: HisStudentComponent , canActivate:[AllowdDoctorGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
