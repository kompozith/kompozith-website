import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { LandingModule } from './landing/landing.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { SidebarModule, DropdownModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AdminModule,
    LandingModule,
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [
    TranslateService,provideAnimations(),
    importProvidersFrom(SidebarModule, DropdownModule),
    IconSetService,
    provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


