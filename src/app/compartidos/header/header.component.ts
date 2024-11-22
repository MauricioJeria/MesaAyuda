import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/firebase/auth.service';
import { usuarioIn } from 'src/app/models/usuario.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  usuarioAutenticado: boolean = false;
  nombreUsuario: string  | null = null;
  color: string;

  private suscripcion = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((usuario) => {
      if (usuario){
        this.usuarioAutenticado = true;
        this.nombreUsuario = usuario.usuario;
      }else{
        this.usuarioAutenticado = false;
        this.nombreUsuario = null;
      }

    });
  }

  async cerrarSesion(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar Cierre de Sesión',
      message: '¿Estás seguro de querer cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          handler: async () => {
            await this.authService.logout();

            this.usuarioAutenticado = false;
            this.nombreUsuario = null;
            this.router.navigate(['/iniciosesion']);

            this.alertaCierreSesion('Cierre de Sesión', 'Has salido de la Aplicación');
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  async alertaCierreSesion(titulo: string, mensaje: string): Promise<void> {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
