import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ContactMessage } from '../../modeles/contact-message';

@Injectable({
  providedIn: 'root'
})
export class IntouchService {

  private dbPath = '/messages';

  messagesRef: AngularFireList<ContactMessage>;
  
  constructor(private afd: AngularFireDatabase) { 
    this.messagesRef = this.afd.list(this.dbPath);
  }
  // Lister tous les messages d eprise de contact
  list(): AngularFireList<ContactMessage> {
    return this.messagesRef;
  }
  // Ajouter un nouveau message dans la base de donnes.
  create(data: ContactMessage): any {
    return this.messagesRef.push(data);
  }
  // Recevoir un message particulier par son ID
  getById(id : string): any {
    return this.afd.object(this.dbPath+`/${id}`).valueChanges();
  }
  // Modifier un message de prise de contact
  update(id : string, data: ContactMessage): Promise<void> {
    return this.messagesRef.update(id, data);
  }
  // Supprimer un message
  delete(id: any): Promise<any> {
    return this.messagesRef.remove(id);
  }
  
}
