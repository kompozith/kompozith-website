import { Component } from '@angular/core';
import { HttpResponseService } from '../../../_services/http-response.service';

@Component({
  selector: 'app-http-response-status',
  templateUrl: './http-response-status.component.html',
  styleUrls: ['./http-response-status.component.scss']
})
export class HttpResponseStatusComponent {

  constructor(public _httpResponseService: HttpResponseService) {}
}
