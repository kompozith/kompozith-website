import { Injectable } from '@angular/core';
import { OrderMemoryService } from './order-memory.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private _orderMemoryService: OrderMemoryService,){
  }

  public products: any = [];
  public services: any = [];
  public services_copy: any = [];
  flexible: boolean = false;

  public cmd_id: any;
  public cmd_services: any = [];
  public all_services:{id: number, name:string, price: number, qty: number, wholesalePrice: boolean, netPrice: boolean}[] =  [
    {
      id: 1,
      name: 'pricing.service.name.branding',
      price: 90000,
      qty: 1,
      wholesalePrice: false,
      netPrice: true
    },
    {
      id: 2,
      name: 'pricing.service.name.min_website',
      price: 120000,
      qty: 1,
      wholesalePrice: false,
      netPrice: true
    },
    {
      id: 3,
      name: 'pricing.service.name.social_media',
      price: 25000,
      qty: 1,
      wholesalePrice: false,
      netPrice: true
    },
    {
      id: 4,
      name: 'pricing.service.name.marketing_plan',
      price: 30000,
      qty: 1,
      wholesalePrice: false,
      netPrice: true
    },
    {
      id: 5,
      name: 'pricing.service.name.communication_plan',
      price: 30000,
      qty: 1,
      wholesalePrice: false,
      netPrice: true
    },
    {
      id: 6,
      name: 'pricing.service.name.lead',
      price: 30000,
      qty: 1,
      wholesalePrice: false,
      netPrice: true
    },
    {
      id: 7,
      name: 'pricing.service.name.branding_study',
      price: 20000,
      qty: 1,
      wholesalePrice: false,
      netPrice: true
    },
    {
      id: 8,
      name: 'pricing.service.name.website_review',
      price: 80000,
      qty: 1,
      wholesalePrice: false,
      netPrice: true
    },
    {
      id: 9,
      name: 'pricing.service.name.flyer',
      price: 18000,
      qty: 1,
      wholesalePrice: true,
      netPrice: true
    },
    {
      id: 10,
      name: 'pricing.service.name.roll_up',
      price: 20000,
      qty: 1,
      wholesalePrice: true,
      netPrice: true
    },
    {
      id: 11,
      name: 'pricing.service.name.logo',
      price: 35000,
      qty: 1,
      wholesalePrice: true,
      netPrice: true
    },
    {
      id: 12,
      name: 'pricing.service.name.business_card',
      price: 15000,
      qty: 1,
      wholesalePrice: true,
      netPrice: true
    },
    {
      id: 13,
      name: 'pricing.service.name.web_app',
      price: 300000,
      qty: 1,
      wholesalePrice: false,
      netPrice: false
    },
    {
      id: 14,
      name: 'pricing.service.name.complexe_website',
      price: 200000,
      qty: 1,
      wholesalePrice: false,
      netPrice: false
    },
    {
      id: 15,
      name: 'pricing.service.name.mobile_app',
      price: 250000,
      qty: 1,
      wholesalePrice: false,
      netPrice: false
    },
    {
      id: 16,
      name: 'pricing.service.name.desk_app',
      price: 350000,
      qty: 1,
      wholesalePrice: false,
      netPrice: false
    }
  ]
  public packs = [
    {
      id: '1',
      name: "pricing.pack.name.starter",
      services: [{id:1,qty:1,selected:true},{id:2,qty:1,selected:true},{id:3,qty:1,selected:true},{id:4,qty:3,selected:true},{id:5,qty:3,selected:true},{id:6,qty:1,selected:true}],
      description: 'pricing.pack.description.starter',
      color: '#44cebe',
      price: 300000,
      duration: 1,
    },
    {
      id: '2',
      name: "pricing.pack.name.boost",
      description: "pricing.pack.description.boost",
      color: '#098dd7',
      services: [{id:7,qty:1,selected:true},{id:8,qty:1,selected:true},{id:9,qty:1,selected:true},{id:4,qty:3,selected:true},{id:5,qty:3,selected:true},{id:6,qty:1,selected:true}],
      price: 250000,
      duration: 1,
    },
    {
      id: '3',
      name: "pricing.pack.name.flex",
      description: "pricing.pack.description.flex",
      color: '#3d449e',
      services: [{id:1,qty:1,selected:true},{id:2,qty:1,selected:false},{id:3,qty:1,selected:false},{id:4,qty:1,selected:true},{id:5,qty:1,selected:false},{id:6,qty:1,selected:true}],
      price: 0,
      duration: 1,
      follow_up: 1,
    }
  ]
  
  curency = 'XAF';
  
  ngOnInit(){
    let flex: any = JSON.stringify(this.packs[2].services);
    localStorage.getItem('saved-flex-pack') ? flex = localStorage.getItem('saved-flex-pack'): "";
    this.packs[2].services = JSON.parse(flex);
    
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
  calcPrice(price: number){
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
  totalItemPrice(serv: any){
    let price = this.getService(serv.id).price;
    let qty = serv.qty;
    let totalPrice = serv.wholesalePrice ? this.fibonacci(price, qty) : price*qty;
    return this.calcPrice(totalPrice);
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

  
  totalPackPrice(services: any){
    let pack_price = 0;
    services.map((serv: any) => {
      let elem = this.getService(serv.id);
      if (serv.selected == true){ 
        pack_price += serv.wholesalePrice ? this.fibonacci(elem.price, elem.qty) : elem.price * elem.qty;
      }
    })
    return this.calcPrice(pack_price);
  }
  
  totalOrderPrice(){
    let cmd_price = 0;
    this.cmd_services.map((serv: any) => {
      let elem = this.getService(serv.id);
      cmd_price += serv.wholesalePrice ? this.fibonacci(elem.price, elem.qty) : elem.price * elem.qty;
    })
    return this.calcPrice(cmd_price);
  }
  
  serviceCall(service: any){
    let result = this.getService(service.id)
    return {name: result?.name, qty: service.qty};
  }
  
  getService(id: any){
    let result: any;
    for (let i = 0; i < this.all_services.length; i++) {
      if(id == this.all_services[i].id){
        result = this.all_services[i];
        break;
      } 
    }
    return result;
  }
  
  selection(item: any){
    item.selected ? this.addToList(item): this.cmdRemoveProduct(item);
    item.selected = !item.selected;
  }
  
  
  getSavedPack(){
    this.cmd_services.filter((cmd_elem: any) => {
      this.packs[2].services.map((flex_elem: any) => {
        (flex_elem.id == cmd_elem.id)? flex_elem.selected = true : '';
      });
    });
  }
  getOrder(order: any){
    let temp_order: [] = order;
    let temp = this.all_services.filter((cmd_elem: any) => {
      let resp = false;
      temp_order.map((flex_elem: any) => {
        (flex_elem.id == cmd_elem.id)? (resp = true, cmd_elem.qty = flex_elem.qty) : '';
      });
      return resp;
    });
    this.cmd_services = temp;
  }
  getPackByName(pack_name: any){
    let pack = this.packs.filter((elem: any) => {
      return elem.name.toLowerCase() == pack_name.toLowerCase();
    });
    return pack[0];
  }
  getSavedOrder(order: any){
    let temp_order: [] = order;
    let temp = this.all_services.filter((cmd_elem: any) => {
      let resp = false;
      temp_order.map((flex_elem: any) => {
        (flex_elem.id == cmd_elem.id)? resp = true : '';
      });
      return resp;
    });
    this.cmd_services = temp;
  }
  getSavedFlex(){
    let flex: any;
    localStorage.getItem('saved-order') ? flex = localStorage.getItem('saved-order'): "";
    let temp_order: [] = JSON.parse(flex);
    let temp = this.all_services.filter((cmd_elem: any) => {
      let resp = false;
      temp_order.map((flex_elem: any) => {
        (flex_elem.id == cmd_elem.id)? resp = true : '';
      });
      return resp;
    });
    this.cmd_services = temp;
  }
  total(pack: any){  
    let sum = 0;
    pack.all_services.map((elem: any) => { 
      elem.selected ? sum += this.getService(elem.id)?.price: '' 
    })
    return sum;
  }
  
  saveOrder(){
    this._orderMemoryService.savedOrder(this.cmd_services).subscribe((elem: any) => {});
  }
  addToList(serv: any){
    serv.qty = 1;
    this.cmd_services.push(serv);
    this.actualizeProduct(this.cmd_services);
    this.saveOrder();
  }
  
  cmdRemoveProduct(serv: any){
    let servs = this.cmd_services;
    let temp = servs.filter((p: any) => {
      return (p.id != serv.id);
    });
    this.cmd_services = temp;  
    this.actualizeProduct(temp); 
    this.saveOrder();
  }

  actualizeProduct(datas: any){
    let temp = this.all_services.filter((serv: any) => {
      var result = true;
      datas.map((cmd_pr: any) => {
        (cmd_pr.id == serv.id)?
        (result = false):
        '';
      });
      return result;
      
    });
    this.services = temp; 
    this.services_copy = temp; 
    this.flexible ?? this.filterUpdate();
  }
  setQty(e: any, serv: any){
    //Aucune valeur saisie
    if(!e.target.value){
      serv.qty = e.target.value = 1;
    }
    // Valeur normalement saisie
    else{
      serv.qty = e.target.value
    }
    // mis a jour du champ de saisie
    e.target.value = serv.qty;
  }
  
  public decrement(serv: any) {
    if (serv.qty > 1) {
      serv.qty -= 1;
      this.saveOrder();
    }    
  }

  public increment(serv: any) {
    serv.qty += 1;
    this.saveOrder();
  }
  
  finalizeTransaction(){
    this.cmd_services.map((cmd_pr: any) => {
      cmd_pr.quantity = cmd_pr.qty;
    });
  }
  
  saveChanges(){
    if (this.cmd_services.length <= 0) {
      return;
    }
    this.finalizeTransaction();
    let dta = {
      products: this.cmd_services,
      type: 'out',
    }

  }
  async savedToLocalStorage(pack: any){
    pack.id < 2 ? localStorage.setItem('saved-order', JSON.stringify(pack.services)) : '';
  }
  
}
