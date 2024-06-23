import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LandingRoutes } from '../routes/landing-routes.';

import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';

import { PortfolioComponent } from './shared/sections/portfolio/portfolio.component';
import { HeroComponent } from './shared/sections/hero/hero.component';
import { BlogComponent } from './shared/sections/blog/blog.component';
import { StatistiquesComponent } from './shared/sections/statistiques/statistiques.component';
import { OrderComponent } from './components/order/order.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { BreadcrumpComponent } from './shared/breadcrump/breadcrump.component';
import { AboutComponent } from './shared/sections/about/about.component';
import { ServicesComponent } from './shared/sections/services/services.component';
import { TeamComponent } from './shared/sections/team/team.component';
import { TestimonialsComponent } from './shared/sections/testimonials/testimonials.component';
import { HistoryComponent } from './shared/sections/history/history.component';
import { PricingComponent } from './shared/sections/pricing/pricing.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './landing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '@coreui/angular';
import { SharedModule } from '../shared/shared.module';
import { LandingSharedModule } from './shared/landing.shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    TeamComponent,
    TestimonialsComponent,
    HistoryComponent,
    PricingComponent,
    PortfolioComponent,
    HeroComponent,
    BlogComponent,
    StatistiquesComponent,
    OrderComponent,
    ContactComponent,
    AboutUsComponent,
    OurServicesComponent,
    BreadcrumpComponent,
    LandingComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutes,
    TranslateModule,
    FormModule,
    ReactiveFormsModule,
    SharedModule,
    LandingSharedModule,
    SwiperModule
  ],
  providers: [DatePipe]
})
export class LandingModule { }
