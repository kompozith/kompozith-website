import { Routes } from "@angular/router";
import { HomeComponent } from "src/app/components/home/home.component";
import { OrderComponent } from "src/app/components/order/order.component";

export const content: Routes = [
  {
    path: '',
    component: HomeComponent, 
    // path: "product",
    // loadChildren: () => import("../../components/product/product.module").then((m) => m.ProductModule),
  },
  {
    path: 'order/:pack',
    component: OrderComponent, 
  },
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' 
  }
];
