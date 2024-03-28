import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ContactMessage } from '../modeles/contact-message';

@Injectable({
  providedIn: 'root'
})
export class IntouchService {

  messagesRef: any;
  
  constructor(
    private firebase: AngularFirestore,
  ) { 
    this.messagesRef = this.firebase.collection('messages');
  }
  //Lister tous les messages d eprise de contact
  list(): any {
    return this.messagesRef;
  }
  //Ajouter un nouveau message dans la base de donnes.
  create(data: ContactMessage): Promise<any> {
    return this.messagesRef.add(data);
  }
  //Recevoir un message particulier par son ID
  getById(id : string){
    return this.firebase.collection('messages/' + id).get();
  }
  //Modifier un message de prise de contact
  update(id : string, data: ContactMessage){
    return this.messagesRef.doc(id).update(data);
  }
  //Supprimer un message
  delete(id: any): Promise<any> {
    return this.messagesRef.doc(id).delete();
  }
  
}
