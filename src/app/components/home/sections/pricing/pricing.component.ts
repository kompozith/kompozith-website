import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderMemoryService } from 'src/app/_services/order-memory.service';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit{
  constructor(
    public _orderService: OrderService,
    private router: Router,
    private _orderMemoryService: OrderMemoryService
  ){
    
  }
  
  ngOnInit(){
     this._orderService.getSavedPack()
     let flex: any = JSON.stringify(this._orderService.packs[2].services);
     localStorage.getItem('pack-flex') ? flex = localStorage.getItem('pack-flex'): "";
     this._orderService.packs[2].services = JSON.parse(flex);
  }
  
  submit(pack: any){
    this._orderMemoryService.savedOrder(pack).subscribe((data: any) => {
      this.router.navigate(['/order/'+ pack.name.toLowerCase()]);
    })
  }
}
