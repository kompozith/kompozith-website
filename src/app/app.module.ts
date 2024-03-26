import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './shared/sections/about/about.component';
import { ServicesComponent } from './shared/sections/services/services.component';
import { TeamComponent } from './shared/sections/team/team.component';
import { TestimonialsComponent } from './shared/sections/testimonials/testimonials.component';
import { HistoryComponent } from './shared/sections/history/history.component';
import { PricingComponent } from './shared/sections/pricing/pricing.component';
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
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
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
    ContactComponent,
    AboutUsComponent,
    OurServicesComponent,
    BreadcrumpComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule,
    AppRoutingModule,
    SharedModule,
    SwiperModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }


