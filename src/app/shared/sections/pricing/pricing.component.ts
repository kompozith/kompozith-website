import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderMemoryService } from 'src/app/_services/order-memory.service';
import { OrderHelper } from 'src/app/_services/order-helper.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit{
  constructor(
    public _orderHelper: OrderHelper,
    private router: Router,
    private _orderMemoryService: OrderMemoryService
  ){
    
  }
  
  ngOnInit(){
    this._orderMemoryService.getSavedOrder().subscribe((data: any) => {
       data ? (this._orderHelper.cmd_services = JSON.parse(data), 
       this._orderHelper.packs[2].services.map((flex_elem: any) => {
         flex_elem.selected = false;
       })) : '';
       this._orderHelper.getSavedPack();
    });
  }
  
  submit(pack: any){
    this._orderMemoryService.savedOrder(this._orderHelper.cmd_services).subscribe((data: any) => {
      this.router.navigate(['/order/'+ pack.name.toLowerCase()]);
    })
  }
}
