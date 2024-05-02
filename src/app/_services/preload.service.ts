import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {
  preload(){
    window.scrollTo(0, 0);
    var preloader = document.getElementById('preloader');
    preloader?.classList.add('preload');
    setTimeout(() => {
      preloader?.classList.remove('preload');
    }, 2000);
  }
}
