import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TapToTopComponent } from './tap-to-top/tap-to-top.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
      TapToTopComponent,
      NavComponent,
      FooterComponent
  ],
  imports: [],
  providers: [],
  exports: [
    TapToTopComponent,
    NavComponent,
    FooterComponent],
})
export class SharedModule {}
