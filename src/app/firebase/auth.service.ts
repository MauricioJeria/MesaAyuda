import { Firestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';
import { usuarioCompleto } from '../models/usuario.models';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  isLoading = false;
  private userSubject = new BehaviorSubject<usuarioCompleto | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private afAuth: AngularFireAuth,
    private Firestore: AngularFirestore,
    private router: Router,
    private FireAuth: AngularFireAuth
  ) {
    this.FireAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await firstValueFrom(
          this.Firestore.collection('usuarios').doc(user.uid).get()
        );
        const usuarioCompleto = userDoc.data() as usuarioCompleto;
        this.userSubject.next(usuarioCompleto);
      } else {
        this.userSubject.next(null);
      }
    });
  }

  setUser(usuario: usuarioCompleto){
    this.userSubject.next(usuario);
  }

  getUser(){
    return this.userSubject.value;
  }


  // Registro con email y contraseña
  async register(email: string, password: string, userData?: any) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);

    if (userData && credential.user) {
      await this.Firestore.collection('users').doc(credential.user.uid).set({
        email: credential.user.email,
        ...userData
      });
    }

    return credential;
  }

  // Inicio de sesión con email y contraseña
  async login(email: string, password: string) {
    try {
      const userCredential = await this.FireAuth.signInWithEmailAndPassword(email, password);

      if (userCredential) {
        const userId = userCredential.user?.uid;
        const userDoc = await firstValueFrom(this.Firestore.collection('usuarios').doc(userId).get());
        const usuarioCompleto = userDoc.data() as usuarioCompleto ;

        if (!usuarioCompleto) {
          throw new Error('Usuario no encontrado en la base de datos.');
        }

        const ruta =
          usuarioCompleto.rol === 'Admin' ? '/ticket-list' : '/ticket-generate';
        await this.router.navigate([ruta]);
      }
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error?.message || error);
      throw error;
    }
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
