import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './landing.component';

const routes: Routes =  [
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
