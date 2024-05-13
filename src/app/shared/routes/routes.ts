import { Routes } from "@angular/router";
import { AdminComponent } from "../../admin/admin.component";

export const content: Routes = [
  {
    path: '',
    component: AdminComponent,
    loadChildren: () => import("../../landing/landing.module").then((m) => m.LandingModule),
  },
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () => import("../../admin/admin.module").then((m) => m.AdminModule),
  },
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' 
  }
];
