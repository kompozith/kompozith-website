import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/breadcrump/breadcrump.component';
import { PreloadService } from 'src/app/_services/preload.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private _preloadService: PreloadService){
  }
  ngOnInit(): void {
    this._preloadService.preload();
  }
  
  breadcrumbItems: BreadcrumbItem = {
    title: 'Contact',
    datas: [
      { label: 'Accueil', route: '/' },
      { label: 'Contact', route: '/contact' },
    ]
  };

}