import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../../../modeles/order';
import { OrderService } from '../../../_services/order.service';
import { OrderHelper } from '../../../_services/order-helper.service';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonCloseDirective, CardBodyComponent, CardComponent, ColComponent, RowComponent, TableDirective } from '@coreui/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpResponseService } from '../../../_services/http-response.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderSkeletonComponent } from "../order-skeleton/order-skeleton.component";
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from "../../../shared/shared.module";

@Component({
    selector: 'app-order-details',
    standalone: true,
    templateUrl: './details.component.html',
    styleUrl: './details.component.scss',
    providers: [DatePipe],
    imports: [
      CommonModule,
      ButtonCloseDirective,
      RowComponent,
      CardComponent,
      ReactiveFormsModule,
      OrderSkeletonComponent,
      SharedModule,
      TableDirective,
      ColComponent,
      CardBodyComponent,
      TranslateModule,
    ]
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  order!: Order;
  orderKey!: string;
  message: string  = '';
  loading: boolean = true;
  submitted: boolean = false;
  updatable: boolean = false;
  emailEditable: boolean = false;
  orderForm!: FormGroup;
  skeleton: number[] = Array.from({length: 10}, (_, i) => i + 1);
  skeleton2: number[] = Array.from({length: 7}, (_, i) => i + 1);
  
  title: string = 'order.text_21';

  constructor(
    private orderService: OrderService,
    public _orderHelper: OrderHelper,
    private route: ActivatedRoute,
    public _httpResponseService: HttpResponseService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.loading = true;
    this.submitted = false;
    this.updatable = false;
    this.emailEditable = false;
    this.route.paramMap.subscribe(params => {
      const key = params.get('key');
      this.orderService.getById(key!)
      .subscribe((data: any) => {
        this.order = data;
        this._orderHelper.cmd_services = data.items;
        this._orderHelper.refreshServices(data.items);
        this.loading = false;
        this.initForm();
      })
      this.orderKey = key!;
    });
  }

  ngOnInit(): void {
    this.orderForm?.valueChanges.subscribe(() => {
      this._httpResponseService.response = {status: false, message: ''};
    });
  }
  
  initForm() {
    this.orderForm = this.fb.group({
      firstname:[this.order?.author.firstname, Validators.required],
      lastname:[this.order?.author.lastname, Validators.required],
      email:[{value: this.order?.author.email, disabled: true}],
      phoneNumber:[this.order?.author.phoneNumber],
      requirements:[this.order?.requirements],
    });
  }

  enableUpdate() {
    this.updatable = !this.updatable;
  }
  
  saveUpdates() {
    this.submitted = true;
    if (!this.orderForm.valid) {
      return;
    }
    if(!this._orderHelper.cmd_services.length){
      this._httpResponseService.response = {status: false, message: 'notification.order.empty'};
      return;
    }
    this._orderHelper.finalizeOrder();
    this.loading = true;
    let datas: Order = {
      author: {
        lastname: this.orderForm.value.lastname ?? "",
        firstname: this.orderForm.value.firstname ?? "",
        email: this.order?.author.email,
        phoneNumber: this.orderForm.value.phoneNumber
      },
      requirements : this.orderForm.value.requirements ?? "", 
      items: this._orderHelper.finalItems,
      date: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm')
    };
    this.orderService.update(this.orderKey, datas).then((resp: any) => {
      this.submitted = false;
      this.initForm();
      this.loading = false;
      this._httpResponseService.response = {status: true, message: 'notification.order.saved.success'};
    }).catch(err => {
      console.log(err);
      this.loading = false;
      this._httpResponseService.response = {status: false, message: 'notification.order.saved.error'};
    });
  }
  
  ngOnDestroy(){
    this._orderHelper.flexible = false;
    this.loading = false;
    this._httpResponseService.response = {status: false, message: ''};
  }
}
