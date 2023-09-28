import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DontEnerloginGuard implements CanActivate {
  constructor(private authService: AuthService , private router:Router ,private toaster:ToastrService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getRole().pipe(
        map((res: any) => {
          const user = res;
          if (user.role) {
            this.router.navigate(['/subject'])
            return false;
          } else {
            return true;
          }
        })
        );
      }
  }
