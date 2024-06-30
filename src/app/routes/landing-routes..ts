import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from '../modules/landing/components/order/order.component';
import { AboutUsComponent } from '../modules/landing/components/about-us/about-us.component';
import { ContactComponent } from '../modules/landing/components/contact/contact.component';
import { OurServicesComponent } from '../modules/landing/components/our-services/our-services.component';
import { HomeComponent } from '../modules/landing/components/home/home.component';
import { LandingComponent } from '../modules/landing/landing.component';

const landingRoutes: Routes =  [
  { path: '', component: LandingComponent,
    children: [
      { path:'', component: HomeComponent },
      { path: 'order/:pack', component: OrderComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'services', component: OurServicesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(landingRoutes)],
  exports: [RouterModule]
})
export class LandingRoutes { }
