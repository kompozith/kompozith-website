import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../../_services/API/auth.service';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailVerifyGuard implements CanActivate {
  
  constructor(private router: Router, private authService: AuthService) {}
  
  canActivate: CanActivateFn = () => {
    return this.authService.isEmailVerified().pipe(
      take(1),
      map((isEmailVerified: boolean) => {
        if (!isEmailVerified) {
          this.router.navigate(['/auth/email-link']);
          return false;
        }
        this.router.navigate(['/admin']);
        return true;
      })
    );
  }
}
