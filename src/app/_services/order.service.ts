import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public products: any = [];
  public services: any = [];
  public services_copy: any = [];
  flexible: boolean = false;

  public cmd_id: any;
  public cmd_services: any = [];
  public all_services:{id: number, name:string, price: number, qty: number}[] =  [
    {
      id: 1,
      name: 'Identité visuelle (branding)',
      price: 90000,
      qty: 1
    },
    {
      id: 2,
      name: 'Site web minimal',
      price: 120000,
      qty: 1
    },
    {
      id: 3,
      name: 'Création de pages social media',
      price: 25000,
      qty: 1
    },
    {
      id: 4,
      name: 'Plan marketing mensuel',
      price: 30000,
      qty: 1
    },
    {
      id: 5,
      name: 'Plan de communication mensuel',
      price: 30000,
      qty: 1
    },
    {
      id: 6,
      name: 'Accompagnement mensuel',
      price: 30000,
      qty: 1
    },
    {
      id: 7,
      name: 'Evaluation et étude approfondie du branding existant',
      price: 20000,
      qty: 1
    },
    {
      id: 8,
      name: 'Redesign du site web',
      price: 80000,
      qty: 1
    },
    {
      id: 9,
      name: 'Flyer',
      price: 18000,
      qty: 1
    },
    {
      id: 10,
      name: 'Roll up',
      price: 20000,
      qty: 1
    },
    {
      id: 11,
      name: 'Logo',
      price: 35000,
      qty: 1
    },
    {
      id: 12,
      name: 'Carte de visite',
      price: 15000,
      qty: 1
    },
    {
      id: 13,
      name: 'Application web',
      price: 300000,
      qty: 1
    },
    {
      id: 14,
      name: 'Site web complexe',
      price: 200000,
      qty: 1
    },
    {
      id: 15,
      name: 'Application mobile',
      price: 250000,
      qty: 1
    },
    {
      id: 16,
      name: 'Application de bureau',
      price: 350000,
      qty: 1
    }
  ]
  public packs = [
    {
      id: '1',
      name: 'Starter',
      services: [{id:1,qty:1,selected:true},{id:2,qty:1,selected:true},{id:3,qty:1,selected:true},{id:4,qty:3,selected:true},{id:5,qty:3,selected:true},{id:6,qty:1,selected:true}],
      description: "Entreprises et particuliers souhaitant se lancer sur le digital.",
      color: '#44cebe',
      price: 300000,
      duration: 1,
    },
    {
      id: '2',
      name: 'Boost',
      description: "Entreprises et particuliers souhaitant améliorer leurs marques.",
      color: '#098dd7',
      services: [{id:7,qty:1,selected:true},{id:8,qty:1,selected:true},{id:9,qty:1,selected:true},{id:4,qty:3,selected:true},{id:5,qty:3,selected:true},{id:6,qty:1,selected:true}],
      price: 250000,
      duration: 1,
    },
    {
      id: '3',
      name: 'Flex',
      description: "Libre choix parmi la gamme de services selon vos préférences.",
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
    return this.calcPrice(this.getService(serv.id).price * serv.qty);
  }
  
  totalPackPrice(pack: any){
    let pack_price = 0;
    pack.map((serv: any) => {
      let elem = this.getService(serv.id);
      (serv.selected == true) ? pack_price += elem.price * elem.qty : '';
    })
    return this.calcPrice(pack_price);
  }
  
  totalOrderPrice(){
    let cmd_price = 0;
    this.cmd_services.map((serv: any) => {
      let elem = this.getService(serv.id);
      cmd_price += elem.price * elem.qty;
    })
    return this.calcPrice(cmd_price);
  }
  
  serviceCall(service: any){
    let result = this.getService(service.id)
    return [result?.name, (service.qty > 1) ? service.qty+"X "+result?.name : result?.name];
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
    item.selected = !item.selected;
    localStorage.setItem('saved-flex-pack', JSON.stringify(this.packs[2].services));
  }
  
  getSavedPack(){
    let flex: any = JSON.stringify([]);
    localStorage.getItem('saved-flex-pack') ? flex = localStorage.getItem('saved-flex-pack'): "";
    let temp_order: [] = JSON.parse(flex);
    temp_order.filter((cmd_elem: any) => {
      this.packs[2].services.map((flex_elem: any) => {
        (flex_elem.id == cmd_elem.id)? flex_elem.selected = true : '';
      });
    });
  }
  getOrder(){
    let flex: any;
    localStorage.getItem('saved-order') ? flex = localStorage.getItem('saved-order'): "";
    let temp_order: [] = flex ? JSON.parse(flex) : [];
    let temp = this.all_services.filter((cmd_elem: any) => {
      let resp = false;
      temp_order.map((flex_elem: any) => {
        (flex_elem.id == cmd_elem.id)? resp = true : '';
      });
      return resp;
    });
    this.cmd_services = temp;
  }
  getPackByName(pack_name: any){
    let pack = this.packs.filter((elem: any) => {
      return elem.name.toLowerCase == pack_name.toLowerCase;
    });
    return pack[0];
  }
  getSavedOrder(){
    let flex: any;
    localStorage.getItem('saved-flex-pack') ? flex = localStorage.getItem('saved-flex-pack'): "";
    let temp_order: [] = flex ? JSON.parse(flex) : [];
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
  
  addToList(serv: any){
    serv.qty = 1;
    this.cmd_services.push(serv);
    this.actualizeProduct(this.cmd_services);
  }

  cmdRemoveProduct(serv: any){
    let servs = this.cmd_services;
    let temp = servs.filter((p: any) => {
      return (p.id != serv.id);
    });
    this.cmd_services = temp;  
    this.actualizeProduct(temp);  
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
    }    
  }

  public increment(serv: any) {
    serv.qty += 1;
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
}
