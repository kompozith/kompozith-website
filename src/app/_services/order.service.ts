import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from '../modeles/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ordersRef: any;
  
  constructor(
    private firebase: AngularFirestore,
  ) { 
    this.ordersRef = this.firebase.collection('orders');
  }
  //Lister tous les orders d eprise de contact
  list(): any {
    return this.ordersRef;
  }
  //Ajouter un nouveau order dans la base de donnes.
  create(data: Order): Promise<any> {
    return this.ordersRef.add(data);
  }
  //Recevoir un order particulier par son ID
  getById(id : string){
    return this.firebase.collection('orders/' + id).get();
  }
  //Modifier un order de prise de contact
  update(id : string, data: Order){
    return this.ordersRef.doc(id).update(data);
  }
  //Supprimer un order
  delete(id: any): Promise<any> {
    return this.ordersRef.doc(id).delete();
  }
  
}
