import { Routes } from "@angular/router";
import { AdminComponent } from "../../admin/admin.component";
import { adminRoutes } from "../../admin/admin-routes.module";

export const content: Routes = [
  {
    path: '',
    loadChildren: () => import("../../landing/landing.module").then((m) => m.LandingModule),
  },
  { 
    path: 'admin', 
    component: AdminComponent,
    children: adminRoutes
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
