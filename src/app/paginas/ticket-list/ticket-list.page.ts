import { Firestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Router } from '@angular/router';

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
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.page.html',
  styleUrls: ['./ticket-list.page.scss'],
})
export class TicketListPage implements OnInit{
  selecionSegmentos: 'en_progreso' | 'resuelto' = 'en_progreso';
  ticketPendiente: Ticket [] = [];
  ticketResuelto: Ticket [] = [];

  constructor(private Firestore: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargaTicket();
  }

  cargaTicket(){
    this.Firestore.collection<Ticket>('tickets',
      ref => ref.where('status', 'in', ['abierto', 'en_progreso', 'resuelto'])).
      valueChanges({idField: 'id'}).pipe(
        map( tickets => {
          this.ticketPendiente = tickets.filter(
            tickets => tickets.status === 'en_progreso');
          this.ticketResuelto = tickets.filter(
            tickets => tickets.status === 'resuelto');
        })
      )
      .subscribe();
    }
    detalleTicket(ticket: Ticket) {
      this.router.navigate(['/ticket-detalle', ticket.id]);
    }

}
