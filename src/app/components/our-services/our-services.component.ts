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
    title: 'Services',
    datas: [
      { label: 'Accueil', route: '/' },
      { label: 'Services', route: '/services' },
    ]
  };


}