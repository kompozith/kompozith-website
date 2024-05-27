import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalContentComponent, ModalFooterComponent, ModalHeaderComponent } from '@coreui/angular';
import { IntouchService } from '../../../_services/intouch.service';

@Component({
  selector: 'message-delete-modal',
  standalone: true,
  imports: [ButtonCloseDirective,ButtonDirective, CommonModule, ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ModalContentComponent],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteMessageModalComponent {
  @Input() messageKey!: string;
  @Input() exitModal = (): void => {};
  
  title: string = 'Attention';
  message: string = 'Vous etes sur le pointe de supprimer ce message. Cette operation est irreversible, etes vous sur de vouloir continuer?';

  constructor(private intouchService: IntouchService) {}
  
  delete() {
    this.intouchService.delete(this.messageKey).then((resp: any) => {
      this.exitModal();
    }).catch(e => {
      this.exitModal();
    });
  }
}
