import { Routes } from "@angular/router";
import { AboutUsComponent } from "src/app/components/about-us/about-us.component";
import { ContactComponent } from "src/app/components/contact/contact.component";
import { HomeComponent } from "src/app/components/home/home.component";
import { OrderComponent } from "src/app/components/order/order.component";
import { OurServicesComponent } from "src/app/components/our-services/our-services.component";

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
    path: 'about-us',
    component: AboutUsComponent, 
  },
  {
    path: 'contact',
    component: ContactComponent, 
  },
  {
    path: 'services',
    component: OurServicesComponent, 
  },
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' 
  }
];
