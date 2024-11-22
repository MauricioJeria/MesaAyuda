import { TicketService } from './../../servicios/ticket.service';
import { Firestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Ticket } from 'src/app/models/ticket.model';





@Component({
  selector: 'app-ticket-detalle',
  templateUrl: './ticket-detalle.page.html',
  styleUrls: ['./ticket-detalle.page.scss'],
})
export class TicketDetallePage implements OnInit{
  ticket: Ticket | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private Firestore: AngularFirestore,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private TicketService: TicketService,
  ) { }

  ngOnInit() {
    const ticketId = this.route.snapshot.paramMap.get('id');
    if(ticketId) {
      this.TicketService.obtenerTicketPorId(ticketId).subscribe((ticket: Ticket) => {
        this.ticket = ticket;
      });
    }
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

  obtenerTicketsPendientes() {
    return this.Firestore.collection('tickets',
      ref => ref.where('status', '==', 'pendiente')
    ).valueChanges({ idField: 'id' }) as Observable<Ticket[]>;;

  }


  }



