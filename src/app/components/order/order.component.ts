import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{

  ordered_pack: any;
  customizable: boolean = false;
  constructor(
    public _orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
  ){
    this.ordered_pack = this.route.snapshot.paramMap.get('pack');
    console.log(this.ordered_pack);
    
  }
  
  ngOnInit(){
    if((this.ordered_pack != 'starter') && (this.ordered_pack != 'boost') && this.ordered_pack != 'flex'){
      this.router.navigate(['/order/flex']);
    }
    
    if(this.ordered_pack == 'flex'){
      this.customizable = true;
      this._orderService.getSavedOrder()
    }
    else {
      this._orderService.getOrder()
    }
    this._orderService.actualizeProduct(this._orderService.cmd_services);
    this._orderService.services = this._orderService.services_copy;
  }
  
}
