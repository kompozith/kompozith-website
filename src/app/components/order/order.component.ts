import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbItem } from 'src/app/shared/breadcrump/breadcrump.component';
import { OrderMemoryService } from 'src/app/_services/order-memory.service';
import { OrderHelper } from 'src/app/_services/order-helper.service';
import { OrderService } from 'src/app/_services/order.service';
import { PreloadService } from 'src/app/_services/preload.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy{

  public submitted: boolean = false;
  ordered_pack: any;
  current_pack_price : any;
  orderTranslatedTitle : string = 'Commande';
  orderForm!: FormGroup;
  constructor(
    public _orderHelper: OrderHelper,
    private route: ActivatedRoute,
    private router: Router,
    private _orderMemoryService: OrderMemoryService,
    private _preloadService: PreloadService,
    private _orderService: OrderService,
    private fb: FormBuilder,
    private toastr: ToastrService
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
        this._orderHelper.getOrder(order.services)
        this.current_pack_price = order.price;
      }
      this._orderHelper.actualizeProduct(this._orderHelper.cmd_services);
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
  }
  
  breadcrumbItems: BreadcrumbItem = {
    title: 'order.text_0',
    datas: [
      { label: 'home.text_0', route: '/' },
      { label: 'order.text_0', route: '/order/flex' },
    ]
  };
  
  ngOnDestroy(){
    this._orderHelper.flexible = false;
  }
  
  onSubmit(){
    this.submitted = true;
    if (!this.orderForm.valid) {
      return;
    }
    this._orderHelper.finalOrderItems();
    if(!this._orderHelper.cmd_services.length){
      this.toastr.success('Success', 'Empty order!');
      return;
    }
    let items: [{id: string, quantity: any}];
    this._orderService.create({
      author: {
        lastname: this.orderForm.value.lastname?this.orderForm.value.lastname:"",
        firstname: this.orderForm.value.firstname?this.orderForm.value.firstname:"",
        email: this.orderForm.value.email,
        phoneNumber: this.orderForm.value.phoneNumber
      },
      requirements : this.orderForm.value.requirements?this.orderForm.value.requirements:"", 
      items: this._orderHelper.finalItems
    }).then(() => {
      this.submitted = false;
      this.orderForm.reset();
      this.toastr.success('Success', 'Order sent!');
    })
  }
  
}
