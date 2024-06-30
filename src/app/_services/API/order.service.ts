import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Order } from '../../modeles/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private dbPath = '/orders';
  
  ordersRef: AngularFireList<Order>;
  
  constructor(private afd: AngularFireDatabase) { 
    this.ordersRef = this.afd.list(this.dbPath);
  }
  // Lister tous les orders d eprise de contact
  list(): AngularFireList<Order> {
    return this.ordersRef;
  }
  // Ajouter un nouveau order dans la base de donnes.
  create(data: Order): any {
    return this.ordersRef.push(data);
  }
  // Recevoir un order particulier par son ID
  getById(id : string): any {
    return this.afd.object(this.dbPath+`/${id}`).valueChanges();
  }
  // Modifier un order de prise de contact
  update(id : string, data: Order): Promise<void> {
    return this.ordersRef.update(id, data);
  }
  // Supprimer un order
  delete(id: any): Promise<any> {
    return this.ordersRef.remove(id);
  }

}
