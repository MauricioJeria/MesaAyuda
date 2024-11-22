import { Firestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { NgModule } from '@angular/core';




interface Ticket {
  id?: string;
  title: string;
  description: string;
  priority: string;
  location?: string;
  attachments?: string[];
  createdAt: Date;
  status: 'abierto' | 'en_progreso' | 'resuelto' | 'cerrado';
  createdBy: string;
}

@Component({
  selector: 'app-ticket-detalle',
  templateUrl: './ticket-detalle.page.html',
  styleUrls: ['./ticket-detalle.page.scss'],
})
export class TicketDetallePage{
  ticket: Ticket | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private Firestore: AngularFirestore,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.cargaDetalleTicket();
  }

  async cargaDetalleTicket() {
    const loading = await this.loadingController.create({ message: 'Cargando detalles...' });
    await loading.present();

    try {
      const ticketId = this.route.snapshot.paramMap.get('id');
      if (ticketId) {
        const ticketDoc = await this.Firestore.collection('tickets').doc(ticketId).get().toPromise();
        this.ticket = ticketDoc.data() as Ticket;
        await loading.dismiss();
      }
    } catch (error) {
      await loading.dismiss();
      this.presentToast('Error al cargar detalles del ticket', 'danger');
    }
  }
  getBadgeColor() {
    switch (this.ticket?.status) {
      case 'abierto': return 'warning';
      case 'en_progreso': return 'primary';
      case 'resuelto': return 'success';
      case 'cerrado': return 'medium';
      default: return 'light';
    }
  }

  getFileName(url: string): string {
    return url.split('/').pop() || 'Archivo adjunto';
  }

  async descargaArchivos(url: string) {
    window.open(url, '_blank');
  }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }
}
