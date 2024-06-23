import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, BadgeComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective } from '@coreui/angular';
import { IconDirective, IconSetService } from '@coreui/icons-angular';
import { TranslateModule } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteMessageModalComponent } from './delete-modal/delete-modal.component';
import { OrderSkeletonComponent } from '../order/order-skeleton/order-skeleton.component';
import { map } from 'rxjs';
import { OrderHelper } from '../../../_services/order-helper.service';
import { Order } from '../../../modeles/order';
import { IntouchService } from '../../../_services/API/intouch.service';
import { MessageDetailModalComponent } from './detail-modal/detail-modal.component';

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  providers: [BsModalService],
  imports: [
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
    DeleteMessageModalComponent,
    MessageDetailModalComponent,
    TranslateModule
  ]
})
export class MessageComponent implements OnInit {
  @ViewChild(MessageDetailModalComponent) messageDetailModalComponent: any;
  @ViewChild(DeleteMessageModalComponent) deleteMessageModalComponent: any;

  messages: any[] = [];
  loading: boolean = true;
  c_order!: Order;
  modalRef?: BsModalRef;
  skeleton: number[] = Array.from({length: 10}, (_, i) => i + 1);
  
  constructor(
    public iconSet: IconSetService,
    public _orderHelper: OrderHelper,
    private intouchService: IntouchService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.intouchService.list().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data: any) => {
        this.messages = data;
        this.loading = false;
    });
  }

  openModal(template: TemplateRef<any>, messageKey: string) {
    if (messageKey) {
      this.modalRef = this.modalService.show(template, { class: 'modal-md modal-dialog-centered modal-dialog-scrollable'});
    }
  }
  
  exitModal = (): void => {
    this.modalRef?.hide();
  };

}
