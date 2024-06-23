import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  template: '<router-outlet><router-outlet/>',
  // imports: [RouterModule,SharedModule,TranslateModule],
  providers: [TranslateService],
})

export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');
    this.translate.use(translate.getBrowserLang() ?? 'fr');
  }
}
