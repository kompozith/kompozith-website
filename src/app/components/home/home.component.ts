import { Component, OnInit } from '@angular/core';
import { PreloadService } from 'src/app/_services/preload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _preloadService: PreloadService){
  }
  ngOnInit(): void {
    this._preloadService.preload();
  }

}
