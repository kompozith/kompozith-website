import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/API/auth.service';


@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  
  constructor(private router: Router, private authService: AuthService) {}
  
  canActivate: CanActivateFn = () => {
    const token = this.authService.isLoggedIn();
    if (!token) {
      return true;
    } 
    
    this.router.navigate(['/']);
    return false;
  }
}
