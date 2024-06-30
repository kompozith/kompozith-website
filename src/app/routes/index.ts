import { Routes } from "@angular/router";
import { AdminComponent } from "../modules/admin/admin.component";
import { adminRoutes } from "./admin-routes";
import { AuthComponent } from "../modules/auth/auth.component";
import { authRoutes } from "./auth-routes";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("../modules/landing/landing.module").then((m) => m.LandingModule),
  },
  {
    path: 'auth',
    component: AuthComponent, //standalone conponent
    children: authRoutes
  },
  { 
    path: 'admin', 
    component: AdminComponent, //standalone conponent
    children: adminRoutes
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
