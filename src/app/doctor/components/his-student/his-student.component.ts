import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-his-student',
  templateUrl: './his-student.component.html',
  styleUrls: ['./his-student.component.scss']
})
export class HisStudentComponent implements OnInit {
  userInfo: any
  userSubjectTable:any[] = []
  subjectInfo: any
  userNameStudent: any
  userNameTable: any[] = []
  userTable: any[] = []
  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    localStorage.setItem('pageNow', 'student')
    this.getUser()
  }
  getUser() {
    this.authservice.getUsers('students').subscribe((res: any) => {
      this.userInfo = res
      console.log(res)
      console.log(this.userInfo[0].subject)
      for (let x in this.userInfo) {
        let studentName = ''
        let subjectName = ''
        let subjectDegree = 0
        studentName = this.userInfo[x].userName
        if (this.userInfo[x].subject) {
          for (let y in this.userInfo[x].subject) {
            subjectName = this.userInfo[x].subject[y].name
            subjectDegree = this.userInfo[x].subject[y].degree
            const model = {
              name: studentName,
              subject: subjectName,
              degree: subjectDegree
            }
            console.log(model)
            this.userSubjectTable.push(model)
          }
        }
        // this.subjectInfo = this.userInfo[x].subject
        // this.userNameTable.push(this.userNameStudent)
        // this.userSubjectTable.push(this.subjectInfo)
        // console.log(this.userNameStudent)
        // console.log(this.subjectInfo)
      }
      console.log(this.userSubjectTable)
    })
  }
  // getUser() {
  //   this.authservice.getUsers('students').subscribe((res: any) => {
  //     console.log(res)
  //     this.userInfo = res
  //     for (let i = 0; i < this.userInfo.length; i++) {
  //       const model = {
  //         userName: this.userInfo[i]?.userName,
  //         name: this.userInfo[i]?.subject[0].name,
  //         degree: this.userInfo[i]?.subject[0].degree,
  //       }
  //       console.log(model)
  //       this.userTable.push(model)
  //     }
  //   })
  //   console.log(this.userTable)
  // }
}
