import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { User } from '../../modeles/user';
import { UserService } from './user.service';
import { extractOwnProperties } from '../../modules/admin/shared/helpers/property-extractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private dbPath = '/users';
  
  userRef: AngularFireList<User>;

  constructor(
    private afAuth: AngularFireAuth, 
    private afd: AngularFireDatabase,
    private userService: UserService,
  ) {
    this.userRef = this.afd.list(this.dbPath); 
  }
   
  signUp(userData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.afAuth.createUserWithEmailAndPassword(userData.email, userData.password).then(() => {
        let user = new User(userData);
        this.userService.create(user).then((response: any) => {
          console.log(response);
          resolve (response);
        }, error => {
          reject (error);
        })
      }, error => {
        reject (error);
      })
    })
  }
  
  signIn(data: {email: string, password: string, rememberMe: boolean}) {
    return new Promise((resolve, reject) => {
      const persistence = data.rememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;
      return this.afAuth.setPersistence(persistence).then(() => {
        this.afAuth.signInWithEmailAndPassword(data.email, data.password).then((response: any) => {
          resolve (response);
        }, error => {
          reject (error);
        })
      }, error => {
        reject (error);
      })
    })
  }
   
  forgotPassword(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // Vérifier l'existence de l'email dans Realtime Database
      this.afd.list('users', ref => ref.orderByChild('email').equalTo(email)).snapshotChanges().subscribe(snapshot => {
        if (snapshot.length > 0) {
          // L'email existe, envoyer l'email de réinitialisation du mot de passe
          this.afAuth.sendPasswordResetEmail(email)
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        } else {
          // L'email n'existe pas
          reject('Email not found in database');
        }
      }, error => {
        reject(error);
      });
    });
  }
  
  resetPassword(oobCode: string, newPassword: string) {
    return new Promise((resolve, reject) => {
    // L'email existe, envoyer l'email de réinitialisation du mot de passe
    this.afAuth.verifyPasswordResetCode(oobCode)
      .then((result) => {
        console.log(result);
        this.afAuth.confirmPasswordReset(oobCode, newPassword)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
      })
      .catch(error => {
        reject(error);
      });
    });
  }
  
  signInLink(email: string): Promise<any> {
    return this.afAuth.sendSignInLinkToEmail(email, actionCodeSettings)
  }
  
  logout() {
    return this.afAuth.signOut()
  }
  
  get isAuthenticated(): boolean {
    return this.afAuth.currentUser !== null;
  }
}


var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'http://kompozith.com',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'example.page.link'
};