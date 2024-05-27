import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, BadgeComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective } from '@coreui/angular';
import { OrderService } from '../../_services/order.service';
import { map } from 'rxjs';
import { IconDirective, IconSetService } from '@coreui/icons-angular';
import { OrderSkeletonComponent } from "./order-skeleton/order-skeleton.component";
import { OrderHelper } from '../../_services/order-helper.service';
import { Order } from '../../modeles/order';
import { ConfirmModalComponent } from "./delete-modal/delete-modal.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-order',
    standalone: true,
    templateUrl: './order.component.html',
    styleUrl: './order.component.scss',
    providers: [BsModalService],
    imports: [
      RouterLink, 
      ModalBodyComponent, 
      ModalComponent, 
      ModalFooterComponent, 
      ModalHeaderComponent, 
      ModalTitleDirective, 
      ModalToggleDirective, 
      IconDirective, 
      BadgeComponent, 
      RowComponent, 
      ColComponent, 
      TextColorDirective, 
      CardComponent, 
      CardHeaderComponent, 
      CardBodyComponent, 
      TableDirective, 
      TableColorDirective, 
      TableActiveDirective, 
      BorderDirective, 
      AlignDirective, 
      OrderSkeletonComponent, 
      ConfirmModalComponent,
      TranslateModule
    ]
})
export class OrderComponent implements OnInit {
  @ViewChild(ConfirmModalComponent) confirmModalComponent: any;

  orders:any[] = [];
  loading: boolean = true;
  c_order!: Order;
  modalRef?: BsModalRef;
  skeleton: number[] = Array.from({length: 10}, (_, i) => i + 1);
  
  constructor(
    public iconSet: IconSetService,
    public _orderHelper: OrderHelper,
    private orderSErvice: OrderService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.orderSErvice.list().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data: any) => {
        this.orders = data;
        this.loading = false;
    });
  }

  openModal(template: TemplateRef<any>, orderKey: string) {
    if (orderKey) {
      this.modalRef = this.modalService.show(template, { class: 'modal-md modal-dialog-centered modal-dialog-scrollable'});
    }
  }
  exitModal = (): void => {
    this.modalRef?.hide();
  };

}
