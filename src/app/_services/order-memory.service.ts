import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderMemoryService {
 

  constructor() { }
  
  public savedOrder = (services: any) => {
    return Observable.create((observer: any) => {
      localStorage.setItem('saved-order', JSON.stringify(services));      
      observer.next();
    });
  }
  
  public getSavedOrder = () => {
    return Observable.create((observer: any) => {
      let order = localStorage.getItem('saved-order');
      observer.next(order);
    });
  }

}
