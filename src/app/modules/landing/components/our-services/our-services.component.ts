import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from '../../shared/breadcrump/breadcrump.component';
import { PreloadService } from '../../../../_services/preload.service';
import { SeoService } from '../../../../_services/seo.service';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss']
})
export class OurServicesComponent implements OnInit {

  constructor(
    private _preloadService: PreloadService,
    private seoService: SeoService
  ) { 
    this.seoService.updateMetaTags('seo.services.title','seo.services.description','seo.services.keywords')
  }
  ngOnInit(): void {
    this._preloadService.preload();
  }
  
  breadcrumbItems: BreadcrumbItem = {
    title: 'home.services.text_0',
    datas: [
      { label: 'home.text_0', route: '/' },
      { label: 'home.services.text_0', route: '/services' },
    ]
  };


}