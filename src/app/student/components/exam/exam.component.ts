import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DoctorService } from './../../../doctor/services/doctor.service';
import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  [x: string]: any;
  id: any
  user: any
  questionSubject: any
  questionOnly: any[] = [];
  questionIndex: any
  value: any
  result: number = 0
  showResult: boolean = false
  userInfo: any
  userId: any
  SubjectUser: any[] = []
  userSubject: any
  validExamboolean: boolean = true
  subjectId: number | string | undefined
  subjectDegree: number = 0
  allSubjects:any[] = []
  constructor(private activateedRouter: ActivatedRoute, private authService: AuthService, private doctorService: DoctorService, private toaster: ToastrService) {
    this.id = this.activateedRouter.snapshot.paramMap.get('id')
  }
  ngOnInit(): void {
    localStorage.setItem('pageNow', 'exam/'+ this.id)
    this.getSubject();
    this.getUserLoged();
  }

  getSubject() {
    this.doctorService.getSubject(this.id).subscribe(res => {
      this.questionSubject = res
      console.log(res)
    })
  }
  delete(index: number) {
    console.log(index)
    this.questionOnly = this.questionSubject.questions
    this.questionOnly.splice(index, 1)
    const model = {
      name: this.questionSubject.name,
      questions: this.questionOnly
    }
    this.doctorService.updateQustions(model, this.id).subscribe({
    })
  }
  getUserLoged() {
    this.authService.getRole().subscribe(res => {
      this.user = res
      this.userId = this.user.userId
      console.log(this.userId)
      console.log(this.user)

      this.getUserInfo()
    })
  }
  validExam() {
    for(let x in this.allSubjects){
      if(this.allSubjects[x]?.id== this.id){
        this.showResult = true
        this.toaster.warning("تم الإجتياز مسبقا")
        this.result = +(this.allSubjects[x]?.degree)
      }else{
        this.validExamboolean = true
      }
    }
  }
  getUserInfo() {
    this.authService.getStudent(this.user.userId).subscribe((res: any) => {
      this.userInfo = res
      this.allSubjects = this.userInfo.subject
      console.log(this.allSubjects)
      this.validExam()
    })
  }
  upadteStudent() {
    this.allSubjects.push({name: this.questionSubject.name,degree: this.result,id: this.id,})
    const model = {
      userName: this.userInfo.userName,
      email: this.userInfo.email,
      password: this.userInfo.password,
      id: this.userInfo.id,
      subject: this.allSubjects,
    }
    this.authService.upadteStudent(model, this.userInfo.id).subscribe(res => {
      this.toaster.success("تم التسجيل")
    })
  }
  getStudentAnswer(event: any, index: any) {
    this.value = event.value
    this.questionSubject.questions[index]
    if (this.value === this.questionSubject.questions[index].correctAnswer) {
      this.result++
    }
    console.log(this.result)
  }
  getresult() {
    this.showResult = true
    this.upadteStudent()
  }
}
