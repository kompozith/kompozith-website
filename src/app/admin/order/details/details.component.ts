import { Component, Input, OnInit } from '@angular/core';
import { Order, OrderItem } from '../../../modeles/order';
import { OrderService } from '../../../_services/order.service';
import { OrderHelper } from '../../../_services/order-helper.service';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonCloseDirective, CardComponent, RowComponent } from '@coreui/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'order-details-modal',
  standalone: true,
  imports: [
    ButtonCloseDirective,
    TranslateModule,
    RowComponent,
    CardComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
  order!: Order;
  orderKey!: string;
  message: string  = ''
  
  title: string = 'order.text_21';

  constructor(
    private orderService: OrderService,
    public _orderHelper: OrderHelper,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      const key = params.get('key');
      // this.orderService.getById(key!);
      
      this.orderKey = key!;
    });
  }

  ngOnInit(): void {
    // this._orderHelper.cmd_services = this.order.items;
    this._orderHelper.refreshServices(this._orderHelper.cmd_services);
    console.log(this._orderHelper.services)
  }

  saveUpdates() {
    this.orderService.update(this.orderKey, this.order).then((resp: any) => {
    
    }).catch(e => {
    
    });
  }
}
