import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { contactMessage } from '../modeles/contact-message';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class IntouchService {

  messagesRef!: AngularFireList<any>;
  messageRef!: AngularFireObject<any>;
  
  constructor(
    private firebase: AngularFirestore,
    private db: AngularFireDatabase
  ) { }
  //Lister tous les messages d eprise de contact
  list(): any {
    return this.db.list('messages');
  }
  //Ajouter un nouveau message dans la base de donnes.
  create(data: contactMessage): Promise<any> {
    return this.firebase.collection('messages').add(data);
  }
  //Recevoir un message particulier par son ID
  getById(id : string){
    return this.db.object('messages/' + id);
  }
  //Modifier un message de prise de contact
  update(id : string, data: contactMessage){
    return this.firebase.collection('messages').doc(id).update(data);
  }
  //Supprimer un message
  delete(id: any): Promise<any> {
    return this.db.object('messages/' + id).remove();
  }
  
}
