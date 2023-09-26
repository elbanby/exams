import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup
  student: any[] = []
  id:any
  constructor(private fb: FormBuilder, private service: AuthService, private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    localStorage.setItem('pageNow', 'register')
    this.creatForm()
    this.getStudent()
  }
  creatForm() {
    this.formRegister = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required , Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    })
  }
  getStudent() {
    this.service.getUsers('students').subscribe(res => {
      this.student = res
      console.log(this.id=this.student[this.student.length-1].id)
    })
  }
  get email(){
    return this.formRegister.get('email')
  }
  confirmPassword(){
    // return console.log(this.formRegister.get('password')?.value === this.formRegister.get('confirmPassword')?.value ? false : true)
  }
  submit() {
    const model = {
      userName: this.formRegister.value.userName,
      email: this.formRegister.value.email,
      password: this.formRegister.value.password,
    }
    const model1 = {
      userName : this.formRegister.value.userName,
      role : 'user',
      userId : this.id+1
    }
    let index = this.student.findIndex(item => item.email == this.formRegister.value.email)
    if (index !== -1) {
    this.toaster.error("الايميل موجود مسبقا", "", {
      disableTimeOut: false,
      titleClass: "toastr_title",
      messageClass: "toastr_message",
      timeOut: 5000,
      closeButton: true,
    })}
    else {
    this.service.creatUser(model).subscribe(res => {
      this.toaster.success("تم إنشاء الحساب بنجاح", "", {
      })
    })
    this.service.login(model1).subscribe(res => {
      this.service.user.next(res)
    })

    this.router.navigate(['/subject'])
    console.log(model)
    }
  }
}
