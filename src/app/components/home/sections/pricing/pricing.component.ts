import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit{
  public services = [
    {
      id: 1,
      name: 'Identité visuelle (branding / personal branding)',
      price: 90000
    },
    {
      id: 2,
      name: 'Site web minimal',
      price: 120000
    },
    {
      id: 3,
      name: 'Création de pages social media (Facebook, Instagram, LinkedIn)',
      price: 25000
    },
    {
      id: 4,
      name: 'Plan marketing mensuel',
      price: 30000
    },
    {
      id: 5,
      name: 'Plan de communication mensuel',
      price: 30000
    },
    {
      id: 6,
      name: 'Accompagnement mensuel',
      price: 30000
    },
    {
      id: 7,
      name: 'Evaluation et une étude approfondie de l’existant',
      price: 20000
    },
    {
      id: 8,
      name: 'Redesign du site web selon les analyses',
      price: 80000
    },
    {
      id: 9,
      name: 'Rebranding complet',
      price: 75000
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
      price: 250000,
      duration: 1,
      follow_up: 1,
    }
  ]
  
  curency = 'XAF';
  
  simplify(val: number): string{
      let res = val / 1000;
      if (res > 1){
        return ""+Math.round((res + Number.EPSILON) * 10) / 10 +"K"
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
  serviceCall(service: any){
    let result = this.getService(service.id)
    return (service.qty > 1) ? service.qty+"X "+result?.name : result?.name;
  }
  
  getService(id: any){
    let result: any;
    for (let i = 0; i < this.services.length; i++) {
      if(id == this.services[i].id){
        result = this.services[i];
        break;
      } 
    }
    return result;
  }
  
  selection(item: any){
    item.selected = !item.selected;
    localStorage.setItem('pack-flex', JSON.stringify(this.packs[2].services));
  }
  total(pack: any){  
    let sum = 0;
    pack.services.map((elem: any) => { 
      elem.selected ? sum += this.getService(elem.id)?.price: '' 
    })
    return sum;
  }
  
  ngOnInit(){
     let flex: any = JSON.stringify(this.packs[2].services);
     localStorage.getItem('pack-flex') ? flex = localStorage.getItem('pack-flex'): "";
     this.packs[2].services = JSON.parse(flex)
  }
}
