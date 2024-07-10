import { Routes } from '@angular/router';
import { LoginComponent } from '../modules/auth/login/login.component';
import { RegisterComponent } from '../modules/auth/register/register.component';
import { EmailLinkComponent } from '../modules/auth/email/link/link.component';
import { ForgotPasswordComponent } from '../modules/auth/password/forgot/forgot.component';
import { ResetPasswordComponent } from '../modules/auth/password/reset/reset.component';
import { EmailVerificationComponent } from '../modules/auth/email/verify/verify.component';
import { AuthGuard } from '../modules/admin/shared/guard/auth.guard';
import { GuestGuard } from '../modules/admin/shared/guard/guest.guard';
import { EmailVerifyGuard } from '../modules/admin/shared/guard/email-verify.guard';

// import { AdminGuard } from './shared/guard/auth.guard';

export const authRoutes: Routes =  [
    { path: '', redirectTo: 'login', pathMatch: 'prefix' },
    { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
    { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [GuestGuard] },
    { path: 'reset-password', component: ResetPasswordComponent, canActivate: [GuestGuard] },
    // Email verification guard
    { path: 'email-link', component: EmailLinkComponent, canActivate: [AuthGuard,EmailVerifyGuard] },
    { path: 'email-verify', component: EmailVerificationComponent, canActivate: [AuthGuard], },
];
