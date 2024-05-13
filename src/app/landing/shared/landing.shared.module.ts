import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { TapToTopComponent } from './tap-to-top/tap-to-top.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
      TapToTopComponent,
      NavComponent,
      FooterComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
      RouterModule,
    ],
  providers: [],
  exports: [
    TapToTopComponent,
    NavComponent,
    FooterComponent,
    SharedModule
  ],
})
export class LandingSharedModule { }
