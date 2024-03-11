import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  currentLanguage!: string;

  constructor(private translate: TranslateService) {
    let prevLang = localStorage.getItem("language");
    if (prevLang) {
      this.useLanguage(prevLang);
    } else {
      this.useLanguage('fr');
    }
  }

  ngOnInit(): void { }

  useLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem("language", language);
    this.currentLanguage = language;
  }

}
