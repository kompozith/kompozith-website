import { Routes } from '@angular/router';
import { LoginComponent } from '../modules/auth/login/login.component';
import { RegisterComponent } from '../modules/auth/register/register.component';

// import { AdminGuard } from './shared/guard/auth.guard';

export const authRoutes: Routes =  [
    { path: '', redirectTo: 'login', pathMatch: 'prefix' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];
