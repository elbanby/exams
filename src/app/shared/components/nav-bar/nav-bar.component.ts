import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private service:AuthService) { }
  user:any = null
  ngOnInit(): void {
    this.service.user.subscribe((res:any) => {
      if(res.role) {
        this.user = res
      }
    })
  }
  logOut(){
    const model ={}
    this.service.login(model).subscribe(res => {
      this.user = null
      this.service.user.next(res)
      console.log(res)
    })
  }
}
