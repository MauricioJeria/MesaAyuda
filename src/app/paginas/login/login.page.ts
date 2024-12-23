import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/firebase/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],

})
export class LoginPage {
  usuario: string = '';
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  isLogginOut: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }



  async iniciarSesion() {
    try {
      this.isLoading = true;
      const rol = await this.authService.login(this.email, this.password);
      // Verifica que rol sea el esperado
      console.log("Rol obtenido después de login:", rol);
      if(rol === 'Admin'){
        this.router.navigate(['/pantalla-admin']);
      }else if (rol === 'Mantenimiento' || rol === 'Operaciones' || rol === 'Ventas' || rol === 'Gerencia'){
        this.router.navigate(['/pantalla-colaborador']);
      }else {
        alert('CONTACTAR A TI');
      }
    } catch (error: any) {
      alert(error.message || 'Hubo un problema al iniciar sesión.');
    } finally {
      this.isLoading = false;
    }
  }


  irARegistrar () {
    this.router.navigate(['/registrar']);
  }


}
