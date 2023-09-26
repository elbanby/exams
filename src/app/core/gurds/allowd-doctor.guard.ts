import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AllowdDoctorGuard implements CanActivate {
  constructor(private authService: AuthService , private router:Router ,private toaster:ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.getRole().pipe(
      map((res: any) => {
        const user = res;
        if (user.role === 'doctor') {
          return true;
        } else {
          this.toaster.warning("يجب التسجيل كدكتور ")
          this.router.navigate(['/login'])
          return false;
        }
      })
      );
    }
  }
