import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { TapToTopComponent } from './tap-to-top/tap-to-top.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';



export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [


      TapToTopComponent,
      NavComponent,
      FooterComponent
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
    FooterComponent],
})
export class SharedModule {}
