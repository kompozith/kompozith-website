import { Routes } from "@angular/router";
import { AdminComponent } from "../admin/admin.component";
import { adminRoutes } from "./admin-routes";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("../landing/landing.module").then((m) => m.LandingModule),
  },
  { 
    path: 'admin', 
    component: AdminComponent, //standalone conponent
    children: adminRoutes
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
