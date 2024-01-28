import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { TapToTopComponent } from './tap-to-top/tap-to-top.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
      TapToTopComponent,
      NavComponent,
      FooterComponent
  ],
  imports: [
      RouterModule,
    ],
  providers: [],
  exports: [
    TapToTopComponent,
    NavComponent,
    FooterComponent],
})
export class SharedModule {}
