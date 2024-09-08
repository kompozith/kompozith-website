import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private translate: TranslateService,
    private meta: Meta,
    private titleService: Title
  ) { }

  updateMetaTags(title: string, description: string, keywords: string): void {
    this.translate.get(title).subscribe((res: string) => {
      this.titleService.setTitle(res);
    });

    this.translate.get(description).subscribe((res: string) => {
      this.meta.updateTag({ name: 'description', content: res });
    });

    this.translate.get(keywords).subscribe((res: string) => {
      this.meta.updateTag({ name: 'keywords', content: res });
    });
  }
}
