import { Routes } from '@angular/router';
import { LoginComponent } from '../modules/auth/login/login.component';
import { RegisterComponent } from '../modules/auth/register/register.component';
import { LinkVerificationComponent } from '../modules/auth/email/link/link.component';
import { ForgotPasswordComponent } from '../modules/auth/password/forgot/forgot.component';

// import { AdminGuard } from './shared/guard/auth.guard';

export const authRoutes: Routes =  [
    { path: '', redirectTo: 'login', pathMatch: 'prefix' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'email-verification', component: LinkVerificationComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent }
];
