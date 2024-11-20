import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/firebase/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  usuario: string = '';
  email: string = '';
  password: string = '';
  rol: string ='';
  mensajeError: string = '';
  isLoading: boolean = false;
  isLogginOut: boolean = false;

  constructor(private router: Router, private authService: AuthService, private alertController: AlertController) { }

  ngOnInit() {
  }

  yatienescuenta(){
    this.router.navigate(['/iniciosesion']);
  }
  async registrouser(
    usuario: string,email: string, password: string, rol:string, ) {

    if (!usuario || !email || !password || !rol) {
      await this.alerta('Error', 'Todos los campos son obgligatorios.');
      return;
  }

    this.isLoading = true;


    try {

      const existe = await this.authService.revEmailExistente(this.email);
      if (existe) {
        this.isLoading = false;
        await this.alerta('Error', 'Este nombre de usuario ya está en uso. Prueba con otro.  ');
      } else {

        await this.authService.register(this.usuario,
           this.email, this.password, this.rol);
        this.isLoading = false;

        await this.alerta('Exito', 'Registro completo, ahora puedes iniciar sesion.  ');

        this.router.navigate(['/iniciosesion']);
      }
    } catch (error) {
      this.isLoading = false;
      await this.alerta('ERROR', 'Al registrar usuario intentalo mas tarde.  ');
    }
  }

  async onSubmit() {
    try {
      const emailExistente = await this.authService.revEmailExistente(this.email);

      if (emailExistente) {
        // Mostrar alerta si el correo ya existe
        await this.presentAlert('Este correo electrónico ya está registrado.');
      } else {
        this.mensajeError = '';  // Limpiar mensaje de error
        // Proceder con el registro...
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
