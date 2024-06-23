import { Component, Input, OnInit } from '@angular/core';
import { IntouchService } from '../../../../_services/API/intouch.service';
import { ContactMessage } from '../../../../modeles/contact-message';
import { CommonModule } from '@angular/common';
import { ButtonCloseDirective, ButtonDirective, ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ModalContentComponent } from '@coreui/angular';

@Component({
  selector: 'message-detail-modal',
  standalone: true,
  imports: [ButtonCloseDirective,ButtonDirective, CommonModule, ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ModalContentComponent],
  templateUrl: './detail-modal.component.html',
  styleUrl: './detail-modal.component.scss'
})
export class MessageDetailModalComponent implements OnInit {
  @Input() messageKey!: string;
  @Input() exitModal = (): void => {};
  
  message!: ContactMessage;

  constructor(private intouchService: IntouchService) {}
  
  ngOnInit(): void {
    this.intouchService.getById(this.messageKey!)
    .subscribe((data: any) => {
      this.message = data;
    })
  }
  
  updateMessage() {
  
  }

}
