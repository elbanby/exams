import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AllowedStudentsGuard implements CanActivate {
  constructor(private authService: AuthService , private router:Router ,private toaster:ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.getRole().pipe(
      map((res: any) => {
        const user = res;
        if (user.role === 'students') {
          return true;
        } else {
          this.router.navigate(['/login'])
          this.toaster.warning("يجب التسجيل كطالب ")
          return false;
        }
      })
    );
  }
}

