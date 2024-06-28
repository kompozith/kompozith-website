import { Routes } from '@angular/router';
import { LoginComponent } from '../modules/auth/login/login.component';

// import { AdminGuard } from './shared/guard/auth.guard';

export const authRoutes: Routes =  [
    {
        path:'login', component:LoginComponent
    }
];
