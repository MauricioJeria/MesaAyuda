import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // Registro con email y contraseña
  async register(email: string, password: string, userData?: any) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    
    if (userData && credential.user) {
      await this.firestore.collection('users').doc(credential.user.uid).set({
        email: credential.user.email,
        ...userData
      });
    }
    
    return credential;
  }

  // Inicio de sesión con email y contraseña
  async login(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Cerrar sesión
  async logout() {
    await this.afAuth.signOut();
  }

  // Obtener usuario actual
  getCurrentUser() {
    return this.afAuth.currentUser;
  }

  // Verificar estado de autenticación
  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user)
    );
  }

  // Iniciar sesión con Google
  async googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return await this.afAuth.signInWithPopup(provider);
  }

  // Restablecer contraseña
  async resetPassword(email: string) {
    await this.afAuth.sendPasswordResetEmail(email);
  }
}