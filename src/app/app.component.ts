import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  standalone: true,
  imports: [
    // AngularFireDatabaseModule,
    RouterModule,
    SharedModule,
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
    this.translate.use(translate.getBrowserLang() || 'fr');
  }
}
