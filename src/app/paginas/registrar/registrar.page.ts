import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/firebase/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage {
  usuario: string = '';
  email: string = '';
  password: string = '';
  rol: string ='';
  mensajeError: string = '';
  isLoading: boolean = false;
  isLogginOut: boolean = false;

  constructor(private router: Router, private authService: AuthService, private alertController: AlertController) { }



  yatienescuenta(){
    this.router.navigate(['/login']);
  }
  async onRegister() {
    try {
      await this.authService.register(this.usuario, this.email, this.password, this.rol);
      alert('Usuario registrado con éxito.');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Hubo un error al registrar el usuario.');
    }
  }

  async onSubmit() {
    try {
      const emailExistente = await this.authService.revEmailExistente(this.email);

      if (emailExistente) {

        await this.presentAlert('Este correo electrónico ya está registrado.');
      } else {
        this.mensajeError = '';

      }
    } catch (error) {
      this.mensajeError = 'Error al verificar el correo electrónico. Intenta más tarde.';
      await this.presentAlert('Hubo un error al verificar el correo electrónico.');
    }
  }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async alerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
