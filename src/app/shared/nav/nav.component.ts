import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  currentLanguage!: string;
  translatedText: string = 'Devis gratuit'; // Définissez le texte par défaut ici

  constructor(private translate: TranslateService) {
    let prevLang = localStorage.getItem("language");
    if (prevLang) {
      this.useLanguage(prevLang);
    } else {
      this.useLanguage('fr');
    }
  }

  ngOnInit(): void {
    this.loadTranslation();
  }

  useLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem("language", language);
    this.currentLanguage = language;
    this.loadTranslation(); // Chargez la traduction à chaque changement de langue
  }

  private loadTranslation() {
    this.translate.get('nav.text_8').subscribe(
      (translation: string) => {
        this.translatedText = translation || 'Devis gratuit';
        console.log('Traduction réussie :', this.translatedText);
      },
      (error) => {
        console.error('Erreur de traduction :', error);
      }
    );
  }


}
