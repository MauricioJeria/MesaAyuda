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
  async register(
    usuario: string,
    email: string,
    password: string,
    rol: string
  ): Promise<void> {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (credential.user) {
        await this.Firestore
          .collection('usuarios')
          .doc(credential.user.uid)
          .set({
            nombre: usuario,
            email: credential.user.email,
            rol: rol,
          });
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }

  async revEmailExistente(email: string): Promise<boolean> {
    try {
      // Obtener los métodos de inicio de sesión asociados al correo
      const signInMethods = await this.afAuth.fetchSignInMethodsForEmail(email);

      // Si el array tiene elementos, significa que el correo ya está registrado
      return signInMethods.length > 0;
    } catch (error) {
      // En caso de error (por ejemplo, si el formato del email no es válido)
      console.error('Error al verificar el correo electrónico', error);
      throw new Error('Error al verificar el correo electrónico');
    }
  }

  // Inicio de sesión con email y contraseña
  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );

      if (userCredential) {
        const userId = userCredential.user?.uid;
        const userDoc = await firstValueFrom(
          this.Firestore.collection('usuarios').doc(userId).get()
        );
        const usuarioCompleto = userDoc.data() as usuarioCompleto;

        this.userSubject.next(usuarioCompleto);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }



  // Cerrar sesión
  async logout() {
    await this.afAuth.signOut();
    this.userSubject.next(null);
  }

  // Obtener usuario actual
  getCurrentUser(): Observable<usuarioCompleto | null> {
    return this.user$;
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
