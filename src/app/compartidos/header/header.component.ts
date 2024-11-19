import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/firebase/auth.service';
import { usuarioCompleto } from 'src/app/models/usuario.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
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
      this.nombreUsuario = usuario?.usuario || null;
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
          handler: () => {
            this.authService. logout();
            this.router.navigate(['/iniciosesion']);
            this.alertaCierreSesion(
              'Cierre de Sesión',
              'Has salido de la Aplicación'
            );
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
