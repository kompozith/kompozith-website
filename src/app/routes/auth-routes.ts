import { Routes } from '@angular/router';
import { LoginComponent } from '../modules/auth/login/login.component';
import { RegisterComponent } from '../modules/auth/register/register.component';
import { EmailLinkComponent } from '../modules/auth/email/link/link.component';
import { ForgotPasswordComponent } from '../modules/auth/password/forgot/forgot.component';
import { ResetPasswordComponent } from '../modules/auth/password/reset/reset.component';
import { EmailVerificationComponent } from '../modules/auth/email/verify/verify.component';

// import { AdminGuard } from './shared/guard/auth.guard';

export const authRoutes: Routes =  [
    { path: '', redirectTo: 'login', pathMatch: 'prefix' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'email-link', component: EmailLinkComponent },
    { path: 'email-verification', component: EmailVerificationComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent }
];
