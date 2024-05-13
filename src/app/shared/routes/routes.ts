import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: '',
    loadChildren: () => import("../../landing/landing.module").then((m) => m.LandingModule),
  },
  {
    path: 'admin',
    loadChildren: () => import("../../admin/admin.module").then((m) => m.AdminModule),
  },
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' 
  }
];
