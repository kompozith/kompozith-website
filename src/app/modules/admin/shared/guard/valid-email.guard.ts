import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ValidEmailGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate: CanActivateFn = (route) => {
    const email = route.paramMap.get('email');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && emailPattern.test(email)) {
      return true;
    } else {
      // Rediriger vers une page d'erreur ou une autre route
      // this.router.navigate(['/error/forbidden']);
      return false;
    }
  };
}