import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbItem } from '../../shared/breadcrump/breadcrump.component';
import { OrderMemoryService } from '../../../_services/order-memory.service';
import { OrderHelper } from '../../../_services/order-helper.service';
import { OrderService } from '../../../_services/API/order.service';
import { PreloadService } from '../../../_services/preload.service';
import { HttpResponseService } from '../../../_services/http-response.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../_services/API/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  
  public submitted: boolean = false;
  public loading: boolean = false;
  ordered_pack: any;
  current_pack_price : any;
  orderTranslatedTitle : string = 'Commande';
  orderForm!: FormGroup;
  error: string = '';
  success: string = '';
  constructor(
    public _orderHelper: OrderHelper,
    private route: ActivatedRoute,
    private router: Router,
    private _orderMemoryService: OrderMemoryService,
    private _preloadService: PreloadService,
    private _orderService: OrderService,
    private authService: AuthService,
    private fb: FormBuilder,
    public _httpResponseService: HttpResponseService,
    private datePipe: DatePipe
  ){
    this.ordered_pack = this.route.snapshot.paramMap.get('pack');
    
  }
  
  ngOnInit(){
    if((this.ordered_pack != 'starter') && (this.ordered_pack != 'boost') && this.ordered_pack != 'flex'){
      this.router.navigate(['/order/flex']);
    }
    this._orderMemoryService.getSavedOrder().subscribe((data: any) => {
      if(this.ordered_pack == 'flex'){
        this._orderHelper.cmd_services = data ? JSON.parse(data) : [];
        this._orderHelper.flexible = true;
        this._orderHelper.getSavedOrder(this._orderHelper.cmd_services)
      }
      else {
        let order = this._orderHelper.getPackByName(this.ordered_pack);
        this._orderHelper.getOrder(order.items)
        this.current_pack_price = order.price;
      }
      this._orderHelper.refreshServices(this._orderHelper.cmd_services);
      this._orderHelper.services = this._orderHelper.services_copy;
    });
    this.orderForm = this.fb.group({
      firstname:['', Validators.required],
      lastname:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      phoneNumber:[''],
      description:[''],
    });
    this._preloadService.preload();
    this.orderForm.valueChanges.subscribe(() => {
      this._httpResponseService.response = {status: false, message: ''};
    });
  }
  
  breadcrumbItems: BreadcrumbItem = {
    title: 'order.text_0',
    datas: [
      { label: 'home.text_0', route: '/' },
      { label: 'order.text_0', route: '/order/flex' },
    ]
  };
  
  onSubmit(){
    this.submitted = true;
    if (!this.orderForm.valid) {
      return;
    }
    this._orderHelper.finalizeOrder();
    if(!this._orderHelper.cmd_services.length) {
      this._httpResponseService.response = {status: false, message: 'notification.order.empty'};
      return;
    }
    this.loading = true;
    let datas = {
      author: {
        lastname: this.orderForm.value.lastname ?? "",
        firstname: this.orderForm.value.firstname ?? "",
        email: this.orderForm.value.email,
        phoneNumber: this.orderForm.value.phoneNumber
      },
      requirements : this.orderForm.value.requirements ?? "", 
      items: this._orderHelper.finalItems,
      date: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm')
    };
    this._orderService.create(datas).then(() => {
      this.submitted = false;
      this.loading = false;
      // this.authService.signInLink(this.orderForm.value.email).then(() => {
      this.authService.signUp(this.orderForm.value.email, '12345678').then(() => {
        this._httpResponseService.response = {status: true, message: 'auth.user.orderSentAndRegistrationSuccess'};

      }).catch((error: any) => {
        if(error.toString().includes('email address is already in use by another account')){
          this._httpResponseService.response = {status: true, message: 'notification.order.sent.success'};
          return;
        }
        this._httpResponseService.response = {status: false, message: 'auth.user.orderSentAndRegistrationError'}; 
      });
      this.orderForm.reset();
    }).catch((err: any) => {
      this.loading = false;
      this._httpResponseService.response = {status: false, message: 'notification.order.sent.error'};
    }) 
  }
  
  ngOnDestroy(){
    this._orderHelper.flexible = false;
    this.loading = false;
    this._httpResponseService.response = {status: false, message: ''};
  }
  
}
