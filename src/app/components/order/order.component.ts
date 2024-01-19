import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderMemoryService } from 'src/app/_services/order-memory.service';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{

  ordered_pack: any;
  current_pack_price : any;
  constructor(
    public _orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private _orderMemoryService: OrderMemoryService
  ){
    this.ordered_pack = this.route.snapshot.paramMap.get('pack');
    
  }
  
  ngOnInit(){
    if((this.ordered_pack != 'starter') && (this.ordered_pack != 'boost') && this.ordered_pack != 'flex'){
      this.router.navigate(['/order/flex']);
    }
    this._orderMemoryService.geSavedOrder().subscribe((data: any) => {
      let order = JSON.parse(data);
      if(this.ordered_pack == 'flex'){
        this._orderService.flexible = true;
        this._orderService.getSavedOrder(order.services)
      }
      else {
        this._orderService.getOrder(order.services)
        this.current_pack_price = order.price;
      }
      this._orderService.actualizeProduct(this._orderService.cmd_services);
      this._orderService.services = this._orderService.services_copy;
    });
  }
  
}
