import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderMemoryService {
 

  constructor() { }
  
  public savedOrder = (pack: any) => {
    return Observable.create((observer: any) => {
      localStorage.setItem('saved-order', JSON.stringify(pack));      
      observer.next();
    });
  }
  
  public geSavedOrder = () => {
    return Observable.create((observer: any) => {
      let order = localStorage.getItem('saved-order');
      observer.next(order);
    });
  }

}
