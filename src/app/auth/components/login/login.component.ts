import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!:FormGroup
  users:any[]=[]
  typeRole:string = "students"
  userId:any
  constructor(private fb:FormBuilder , private service:AuthService  , private router:Router , private toaster:ToastrService) { }

  ngOnInit(): void {
    localStorage.setItem('pageNow', 'login')
    this.login()
    this.getUsers()
  }
  login(){
    this.formLogin = this.fb.group({
      type:[this.typeRole],
      email : ['',[Validators.required]],
      password : ['',[Validators.required]],
    })
  }
  getRole(event:any){
    this.typeRole = event.value;
    this.getUsers()
  }
  getUsers(){
    this.service.getUsers(this.typeRole).subscribe(res =>{
      this.users = res
    })
  }
  submit(){
    let index = this.users.findIndex(item => item.email == this.formLogin.value.email && item.password == this.formLogin.value.password)
    if(index == -1 ){
      this.toaster.error("الايميل او كلمة المرور غير صحيحة" , "")
    }else{
      const model = {
        userName : this.users[index].userName,
        role : this.typeRole,
        userId :this.users[index].id
      }
      console.log(this.users[index].id)
      this.service.login(model).subscribe(res => {
        this.service.user.next(res)
        this.toaster.success("تم تسجيل الدخول بنجاح" , "" , {
        })
        this.router.navigate(['/subject'])
      })
      console.log(model)
    }
  }
}
