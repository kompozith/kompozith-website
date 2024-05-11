import { Routes } from "@angular/router";
import { AboutUsComponent } from "../../components/about-us/about-us.component";
import { ContactComponent } from "../../components/contact/contact.component";
import { HomeComponent } from "../../components/home/home.component";
import { OrderComponent } from "../../components/order/order.component";
import { OurServicesComponent } from "../../components/our-services/our-services.component";

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
