import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalContentComponent, ModalFooterComponent, ModalHeaderComponent } from '@coreui/angular';
import { OrderService } from '../../../_services/order.service';

@Component({
  selector: 'order-delete-modal',
  standalone: true,
  imports: [ButtonCloseDirective,ButtonDirective, CommonModule, ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ModalContentComponent],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class ConfirmModalComponent {
  @Input() orderKey!: string;
  @Input() exitModal = (): void => {};
  
  title: string = 'Attention';
  message: string = 'Vous etes sur le pointe de supprimer cette commande. Cette operation est irreversible, etes vous sur de vouloir continuer?';

  constructor(private orderService: OrderService) {}
  
  delete() {
    this.orderService.delete(this.orderKey).then((resp: any) => {
      this.exitModal();
    }).catch(e => {
      this.exitModal();
    });
  }
}
