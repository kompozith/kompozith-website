import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../../_services/API/auth.service';
import { map, take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  
  constructor(private router: Router, private authService: AuthService) {}
  
  canActivate: CanActivateFn = () => {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['/admin']);
          return false;
        }
        return true;
      })
    );
  }
}
