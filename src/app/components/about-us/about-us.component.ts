import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/breadcrump/breadcrump.component';
import { PreloadService } from 'src/app/_services/preload.service';

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
  
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Accueil', route: '/' },
    { label: 'À propos', route: '/about-us' },
  ];


}