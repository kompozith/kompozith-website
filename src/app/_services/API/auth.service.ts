import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }
   
  signUp(data: {email: string, password: string}): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(data.email, data.password);
  }
  
  signIn(data: {email: string, password: string}) {
    return this.afAuth.signInWithEmailAndPassword(data.email, data.password)
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