import { usuarioIn } from 'src/app/models/usuario.models';
import { Firestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import 'Firebase/auth';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  isLoading = false;
  private userSubject = new BehaviorSubject<usuarioIn | null>(null);
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
        const usuarioCompleto = userDoc.data() as usuarioIn;
        this.userSubject.next(usuarioCompleto);
      } else {
        this.userSubject.next(null);
      }
    });
  }

  setUser(usuario: usuarioIn){
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
    } catch (error: any) {

      if (error.code === 'auth/email-already-in-use') {
        alert('El correo ya está en uso.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Formato de correo inválido.');
      } else if (error.code === 'auth/weak-password') {
        alert('La contraseña es demasiado débil.');
      } else {
        alert('Error al registrar usuario. Inténtalo de nuevo.');
      }
      console.error('Error al registrar usuario:', error.message, error.code);
      throw error;
    }
  }

  async revEmailExistente(email: string): Promise<boolean> {
    try {
      const signInMethods = await this.afAuth.fetchSignInMethodsForEmail(email);
      return signInMethods.length > 0;
    } catch (error) {
      console.error('Error al verificar el correo electrónico', error);
      throw new Error('Error al verificar el correo electrónico');
    }
  }

  // Inicio de sesión con email y contraseña
  async login(email: string, password: string): Promise<string> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );

      if (userCredential.user) {
        const userId = userCredential.user?.uid;
        const userDoc = await firstValueFrom(
          this.Firestore.collection('usuarios').doc(userId).get()
        );
        if(!userDoc.exists){
          throw new Error('No encontraron datos del usuario en Firestore');
        }
        const usuarioCompleto = userDoc.data() as usuarioIn;
        if(!usuarioCompleto.rol){
          throw new Error('Rol no definido para el usuario.');
        }

        //test de funcionalidad
        console.log("Rol del usuario:", usuarioCompleto.rol);

        this.userSubject.next(usuarioCompleto);
        return usuarioCompleto.rol;
      }else{
        throw new Error('Usuario no autenticado.');
      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
    return null;
  }



  // Cerrar sesión
  async logout() {
    await this.afAuth.signOut();
    this.userSubject.next(null);
  }

  // Obtener usuario actual
  getCurrentUser(): Observable<usuarioIn | null> {
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



  //TEST DE FIRESTORE


}
