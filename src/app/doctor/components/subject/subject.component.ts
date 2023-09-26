import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../auth/services/auth.service';
import { DoctorService } from './../../services/doctor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  subjects: any;
  user: any;
  constructor( private doctorservice :DoctorService , private authservices:AuthService ,private toaster:ToastrService)  { }

  ngOnInit(): void {
    localStorage.setItem('pageNow', 'subject')
    this.getQustions();
    this.getRole()
  }
  getQustions(){
      this.doctorservice.getAllSubjects().subscribe(res =>{
        this.subjects = res
        console.log(this.subjects)
        console.log(res)
    })
  }
  getRole(){
    this.authservices.getRole().subscribe(res=>{
      this.user = res;
      console.log(this.user)
    })
  }
  delete(index:number) {
    let id  = this.subjects[index].id
    this.subjects.splice(index , 1)
    this.doctorservice.deleteSubject(id).subscribe(res => {
      this.toaster.success("تم حذف المادة بنجاح")
    })
  }
}
