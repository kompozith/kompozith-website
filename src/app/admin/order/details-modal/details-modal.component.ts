import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../modeles/order';
import { OrderService } from '../../../_services/order.service';
import { OrderHelper } from '../../../_services/order-helper.service';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonCloseDirective } from '@coreui/angular';

@Component({
  selector: 'order-details-modal',
  standalone: true,
  imports: [
    ButtonCloseDirective,
    TranslateModule,
  ],
  templateUrl: './details-modal.component.html',
  styleUrl: './details-modal.component.scss'
})
export class DetailsModalComponent implements OnInit {
  @Input() order!: Order;
  @Input() orderKey!: string;
  @Input() exitModal = (): void => {}; 
  
  title: string = 'datails de la commande';

  constructor(
    private orderService: OrderService,
    public _orderHelper: OrderHelper,
  ) {}

  ngOnInit(): void {
    this._orderHelper.cmd_services = this.order.items
  }

  saveUpdates() {
    this.orderService.update(this.orderKey, this.order).then((resp: any) => {
      this.exitModal();
    }).catch(e => {
      this.exitModal();
    });
  }
}
