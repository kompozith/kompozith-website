import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './components/home/sections/about/about.component';
import { ServicesComponent } from './components/home/sections/services/services.component';
import { TeamComponent } from './components/home/sections/team/team.component';
import { TestimonialsComponent } from './components/home/sections/testimonials/testimonials.component';
import { HistoryComponent } from './components/home/sections/history/history.component';
import { PricingComponent } from './components/home/sections/pricing/pricing.component';
import { SwiperModule } from 'swiper/angular';
import { PortfolioComponent } from './components/home/sections/portfolio/portfolio.component';
import { HeroComponent } from './components/home/sections/hero/hero.component';
import { BlogComponent } from './components/home/sections/blog/blog.component';
import { StatistiquesComponent } from './components/home/sections/statistiques/statistiques.component';
import { OrderComponent } from './components/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
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
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    SwiperModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
