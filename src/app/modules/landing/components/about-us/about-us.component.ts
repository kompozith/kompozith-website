import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from '../../shared/breadcrump/breadcrump.component';
import { PreloadService } from '../../../../_services/preload.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(private _preloadService: PreloadService){
  }
  ngOnInit(): void {
    this._preloadService.preload();
  }
  
  breadcrumbItems: BreadcrumbItem = {
    title: 'home.about.text_0',
    datas: [
      { label: 'home.text_0', route: '/' },
      { label: 'home.about.text_0', route: '/about-us' },
    ]
  };

}