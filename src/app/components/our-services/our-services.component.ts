import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/breadcrump/breadcrump.component';
import { PreloadService } from 'src/app/_services/preload.service';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss']
})
export class OurServicesComponent implements OnInit {

  constructor(private _preloadService: PreloadService){
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