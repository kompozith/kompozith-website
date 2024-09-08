import { Component, OnInit } from '@angular/core';
import { PreloadService } from '../../../../_services/preload.service';
import { SeoService } from '../../../../_services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _preloadService: PreloadService,
    private seoService: SeoService
  ) { 
    this.seoService.updateMetaTags('seo.home.title','seo.home.description','seo.home.keywords')
  }
  ngOnInit(): void {
    this._preloadService.preload();
  }

}
