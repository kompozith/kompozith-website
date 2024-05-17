import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
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
import { LandingSharedModule } from './shared/landing.shared.module';
import { LandingComponent } from './landing.component';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


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
    LandingRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    LandingSharedModule,
    SwiperModule,
  ],
  providers: [DatePipe]
})
export class LandingModule { }
