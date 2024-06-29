import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { User } from '../../modeles/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';
  userRef: AngularFireList<User>;

  constructor(
    private afAuth: AngularFireAuth, 
    private afd: AngularFireDatabase
  ) {
    this.userRef = this.afd.list(this.dbPath); 
  }
   
  create(data: User): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.userRef.push(data).then((response) => {
        resolve(response);
      }, error => {
        reject (error);
      });
    });
  } 
  // Créer ou mettre à jour un utilisateur par email
  createOrUpdateUserByEmail(email: string, userData: any): Promise<void> {
    return this.getUserIdByEmail(email).then((userId: string | null) => {
      if (userId) {
        // Si l'utilisateur existe, mettez à jour ses données
        return this.afd.object(`${this.dbPath}/${userId}`).update(userData);
      } else {
        // Sinon, créez un nouvel utilisateur
        return this.afd.list(this.dbPath).push(userData).then(ref => {
          const newUserId = ref.key as string;
          return this.afd.object(`${this.dbPath}/${newUserId}`).update({ id: newUserId });
        });
      }
    });
  }

  // Obtenir l'ID d'un utilisateur par email
  private getUserIdByEmail(email: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.afd.list<any>(this.dbPath, ref => ref.orderByChild('email').equalTo(email))
        .snapshotChanges()
        .pipe(
          map(users => {
            const user = users[0];
            return user ? user.key : null;
          })
        )
        .subscribe({
          next: resolve,
          error: reject
        });
    });
  }

  // Obtenir un utilisateur par email
  getUserByEmail(email: string): Observable<any> {
    return this.afd.list<any>(this.dbPath, ref => ref.orderByChild('email').equalTo(email))
      .snapshotChanges()
      .pipe(
        map(users => {
          const user = users[0]?.payload.val();
          return user ? { id: users[0].key, ...user } : null;
        })
      );
  }
}
