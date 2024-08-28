import { Injectable } from '@angular/core';
import { Order, OrderItem } from '../modeles/order';
import { OrderMemoryService } from './order-memory.service';
import { _Service } from '../modeles/service';
import { PackageItem, _Package } from '../modeles/package';

@Injectable({
  providedIn: 'root'
})
export class OrderHelper {

  constructor(
    private _orderMemoryService: OrderMemoryService,){
  }

  public services: _Service[] = [];
  public services_copy: _Service[] = [];
  flexible: boolean = false;

  public cmd_id: any;
  public cmd_services: OrderItem[] = [];
  public finalItems:OrderItem[] = [];
  public all_services:_Service[] =  [
    {
      id: 1,
      name: 'pricing.service.name.branding',
      price: 90000,
      quantity: 1,
      wholesalePrice: false,
      netPrice: true
    },
    {
      id: 2,
      name: 'pricing.service.name.min_website',
      price: 120000,
      quantity: 1,
      wholesalePrice: false,
      netPrice: true
    },
    {
      id: 3,
      name: 'pricing.service.name.social_media',
      price: 25000,
      quantity: 1,
      wholesalePrice: false,
      netPrice: true
    },
    {
      id: 4,
      name: 'pricing.service.name.marketing_plan',
      price: 30000,
      quantity: 1,
      wholesalePrice: false,
      netPrice: true
    },
    {
      id: 5,
      name: 'pricing.service.name.communication_plan',
      price: 30000,
      quantity: 1,
      wholesalePrice: false,
      netPrice: true
    },
    {
      id: 6,
      name: 'pricing.service.name.lead',
      price: 30000,
      quantity: 1,
      wholesalePrice: false,
      netPrice: true
    },
    {
      id: 7,
      name: 'pricing.service.name.branding_study',
      price: 20000,
      quantity: 1,
      wholesalePrice: false,
      netPrice: true
    },
    {
      id: 8,
      name: 'pricing.service.name.website_review',
      price: 80000,
      quantity: 1,
      wholesalePrice: false,
      netPrice: true
    },
    {
      id: 9,
      name: 'pricing.service.name.flyer',
      price: 18000,
      quantity: 1,
      wholesalePrice: true,
      netPrice: true
    },
    {
      id: 10,
      name: 'pricing.service.name.roll_up',
      price: 20000,
      quantity: 1,
      wholesalePrice: true,
      netPrice: true
    },
    {
      id: 11,
      name: 'pricing.service.name.logo',
      price: 35000,
      quantity: 1,
      wholesalePrice: true,
      netPrice: true
    },
    {
      id: 12,
      name: 'pricing.service.name.business_card',
      price: 15000,
      quantity: 1,
      wholesalePrice: true,
      netPrice: true
    },
    {
      id: 13,
      name: 'pricing.service.name.web_app',
      price: 300000,
      quantity: 1,
      wholesalePrice: false,
      netPrice: false
    },
    {
      id: 14,
      name: 'pricing.service.name.complexe_website',
      price: 200000,
      quantity: 1,
      wholesalePrice: false,
      netPrice: false
    },
    {
      id: 15,
      name: 'pricing.service.name.mobile_app',
      price: 250000,
      quantity: 1,
      wholesalePrice: false,
      netPrice: false
    },
    {
      id: 16,
      name: 'pricing.service.name.desk_app',
      price: 350000,
      quantity: 1,
      wholesalePrice: false,
      netPrice: false
    }
  ]
  public packs: _Package[] = [
    {
      id: 1,
      name: "Starter",
      items: [
        {id:1,quantity:1,selected:true},
        {id:2,quantity:1,selected:true},
        {id:3,quantity:1,selected:true},
        {id:4,quantity:3,selected:true},
        {id:5,quantity:3,selected:true},
        {id:6,quantity:1,selected:true}
      ],
      description: 'pricing.pack.description.starter',
      color: '#44cebe',
      price: 300000,
      duration: 1,
    },
    {
      id: 2,
      name: "Boost",
      description: "pricing.pack.description.boost",
      color: '#098dd7',
      items: [
        {id:7,quantity:1,selected:true},
        {id:8,quantity:1,selected:true},
        {id:9,quantity:1,selected:true},
        {id:4,quantity:3,selected:true},
        {id:5,quantity:3,selected:true},
        {id:6,quantity:1,selected:true}
      ],
      price: 250000,
      duration: 1,
    },
    {
      id: 3,
      name: "Flex",
      description: "pricing.pack.description.flex",
      color: '#3d449e',
      items: [
        {id:1,quantity:1,selected:true},
        {id:2,quantity:1,selected:false},
        {id:3,quantity:1,selected:false},
        {id:4,quantity:1,selected:true},
        {id:5,quantity:1,selected:false},
        {id:6,quantity:1,selected:true}
      ],
      price: 0,
      duration: 1,
      follow_up: 1,
    }
  ]
  
  curency = 'XAF';
  
  ngOnInit() {
    let flex: any = JSON.stringify(this.packs[2].items);
    localStorage.getItem('saved-flex-pack') ? flex = localStorage.getItem('saved-flex-pack'): "";
    this.packs[2].items = JSON.parse(flex);
  }
 
  filterUpdate() {
    // Reset ng-select on search
    const val = (<HTMLInputElement>document.getElementById('filter')).value.toLowerCase();
    // const val = event.target.value.toLowerCase();
    // Filter Our Data
    const temp = this.services_copy.filter((row: any) => {
      return (row.name && row.name.toLowerCase().indexOf(val) !== -1) ||
        (row.description && row.description.toLowerCase().indexOf(val) !== -1) ||
        !val;
    });
    // Update The Rows
    this.services = temp;
  }

  simplify(val: number): string{
      let k = val / 1000;
      let m = val / 1000000;
      let md = val / 1000000000;
      if (md > 1){
        return ""+Math.round((md + Number.EPSILON) * 10) / 10 +"Md"
      }
      else if (m > 1){
        return ""+Math.round((m + Number.EPSILON) * 10) / 10 +"M"
      }
      else if (k > 1){
        return ""+Math.round((k + Number.EPSILON) * 10) / 10 +"K"
      }
      return ""+val;
  }
  
  changeCure(cur: string){
    this.curency = cur;
  }
  
  formatAmount(price: number){
    let old_cur = this.curency;
    let net_price;
    switch (this.curency) {
      case 'XAF':
        net_price = this.simplify(Math.round((price + Number.EPSILON) * 10) / 10);
        break;
        
      case 'USD':
        net_price = this.simplify(Math.round((price/650 + Number.EPSILON) * 10) / 10);
        break;
        
      case 'EUR':
        net_price = this.simplify(Math.round((price/670 + Number.EPSILON) * 10) / 10);
        break;
    
      default:
        break;
    }
    return net_price;
  }
  
  totalItemPrice(item: OrderItem){
    let servive: _Service = this.getService(item.id);
    let qty = item.quantity;
    let totalPrice = servive.wholesalePrice ? this.fibonacci(servive.price, qty) : servive.price*qty;
    return this.formatAmount(totalPrice);
  }
  
  estimatedTotal(): boolean {
    return this.cmd_services.some((elem: OrderItem) => !this.getService(elem.id).netPrice);
  }
  
//Suite de Fibonacci pour l'accord de la réduction en fonction de la quantité commandée
  fibonacci(u1: number, n: number): number {
    //U0: prix unitaire
    if(n<=0) return 0;
    //U1
    if(n==1) return u1;
    //Un
    if(n==2) 
      return parseFloat(((((2/3)*u1)+ (u1)).toFixed(2)));
    //Un
    return parseFloat(((((4/5)*this.fibonacci(u1, n-1)) + ((1/5)*this.fibonacci(u1, n-2))+ (u1/2)).toFixed(2)));
  }
  
  totalPackPrice(services: PackageItem[]){
    let pack_price = 0;
    services.map((serv: PackageItem) => {
      let elem = this.getService(serv.id);
      if (serv.selected == true){ 
        pack_price += elem.wholesalePrice ? this.fibonacci(elem.price, elem.quantity) : elem.price * elem.quantity;
      }
    })
    return this.formatAmount(pack_price);
  }
  
  totalizeServicesAmount(services: PackageItem[]){
    let total_price = 0;
    services.map((serv: PackageItem) => {
      let elem = this.getService(serv.id);
      total_price += elem.wholesalePrice ? this.fibonacci(elem.price, elem.quantity) : elem.price * elem.quantity;
    })
    return this.formatAmount(total_price);
  }
  
  totalizeOrderAmount() {
    let totalToPay = 0;
    this.cmd_services.map((serv: OrderItem) => {
      let elem = this.getService(serv.id);
      totalToPay += elem.wholesalePrice ? this.fibonacci(elem.price, serv.quantity) : elem.price * serv.quantity;
    })
    return this.formatAmount(totalToPay);
  }
  
  getService(id: any): _Service{
    let result: any;
    for (let i = 0; i < this.all_services.length; i++) {
      if(id == this.all_services[i].id){
        result = this.all_services[i];
        break;
      } 
    }
    return result;
  }
  
  toggleSelection(item: PackageItem): void {
    item.selected = !item.selected;
    item.selected ? this.addToList(item.id): this.cmdRemoveService(item.id);
  }
  
  
  getSavedPack(): void {
    this.cmd_services.filter((cmd_elem: OrderItem) => {
      this.packs[2].items.map((flex_elem: PackageItem) => {
        (flex_elem.id == cmd_elem.id)? flex_elem.selected = true : '';
      });
    });
  }
  
  getOrder(order: PackageItem[]): void {
    let temp_order: PackageItem[] = order;
    let temp = this.all_services.filter((cmd_elem: _Service) => {
      let resp = false;
      temp_order.map((flex_elem: PackageItem) => {
        (flex_elem.id == cmd_elem.id)? (resp = true, cmd_elem.quantity = flex_elem.quantity) : '';
      });
      return resp;
    });
    this.cmd_services = temp.map(elem => { return {id: elem.id, quantity: elem.quantity }});
  }
  
  getPackByName(pack_name: string): _Package {
    let pack = this.packs.filter((elem: any) => {
      return elem.name.toLowerCase() == pack_name.toLowerCase();
    });
    return pack[0];
  }
  
  getSavedOrder(order: OrderItem[]): void {
    let temp_order: OrderItem[] = order;
    this.cmd_services = [];
    this.all_services.filter((cmd_elem: _Service) => {
      temp_order.map((flex_elem: any) => {
        (flex_elem.id == cmd_elem.id) ? this.cmd_services.push(flex_elem) : '';
      });
    });
  }
  
  getSavedFlex(): void {
    let flex: any;
    localStorage.getItem('saved-order') ? flex = localStorage.getItem('saved-order'): "";
    let temp_order: [] = JSON.parse(flex);
    this.all_services.filter((cmd_elem: _Service) => {
      temp_order.map((flex_elem: PackageItem) => {
        (flex_elem.id == cmd_elem.id) ? this.cmd_services.push(flex_elem) : '';
      });
    });
  }
  
  total(pack: _Package): number {  
    let sum = 0;
    pack.items.map((elem: PackageItem) => { 
      elem.selected ? sum += this.getService(elem.id)?.price: '' 
    })
    return sum;
  }
  
  saveOrder(): void {
    this._orderMemoryService.savedOrder(this.cmd_services).subscribe(() => {});
  }
  
  addToList(item_id: number): void {
    let exist = this.cmd_services.some((item: OrderItem) => item.id == item_id);
    if(!exist) {
      let item: OrderItem = { id: item_id, quantity: 1 }
      this.cmd_services.push(item);
    }
    this.refreshServices(this.cmd_services);
    this.saveOrder();
  }
  
  cmdRemoveService(item_id: number): void {
    let servs = this.cmd_services;
    let temp = servs.filter((p: any) => {
      return (p.id != item_id);
    });
    this.cmd_services = temp; 
    this.refreshServices(this.cmd_services);
    this.saveOrder();
  }

  refreshServices(items: OrderItem[]): void {
    let temp = this.all_services.filter((serv: _Service) => {
      let include = true;
      items.map((cmd_serv: OrderItem) => {
        (cmd_serv.id == serv.id)?
        (include = false):
        '';
      });
      return include;
    });
    this.services = temp; 
    this.services_copy = temp; 
    this.flexible ?? this.filterUpdate();
  }
  
  setQty(e: any, serv: OrderItem): void{
    //Aucune valeur saisie
    if(!e.target.value){
      serv.quantity = e.target.value = 1;
    }
    // Valeur normalement saisie
    else{
      serv.quantity = e.target.value
    }
    // mis a jour du champ de saisie
    e.target.value = serv.quantity;
    this.saveOrder();
  }

  public increment(serv: OrderItem): void {
    serv.quantity += 1;
    this.saveOrder();
  }
  
  public decrement(serv: OrderItem): void {
    if (serv.quantity > 1) {
      serv.quantity -= 1;
      this.saveOrder();
    }    
  }
  
  //After all quantities have been set and ready to be saved.
  finalizeOrder(): void {
    this.finalItems = [];
    this.cmd_services.map((cmd_serv: OrderItem) => {
      this.finalItems.push({id: cmd_serv.id, quantity: cmd_serv.quantity});
    });
  }
  async savedToLocalStorage(pack: _Package){
    pack.id < 2 ? localStorage.setItem('saved-order', JSON.stringify(pack.items)) : '';
  }
  
}
