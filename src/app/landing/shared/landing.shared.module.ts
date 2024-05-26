import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { TapToTopComponent } from './tap-to-top/tap-to-top.component';


@NgModule({
  declarations: [
      TapToTopComponent,
      NavComponent,
      FooterComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
  ],
  providers: [],
  exports: [
    TapToTopComponent,
    NavComponent,
    FooterComponent
  ],
})
export class LandingSharedModule { }
