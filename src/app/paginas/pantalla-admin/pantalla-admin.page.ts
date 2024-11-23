import { TicketService } from './../../servicios/ticket.service';
import { Component, OnInit } from '@angular/core';
import { TicketDetallePage } from '../ticket-detalle/ticket-detalle.page';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket.model';
import { Estadisticas } from 'src/app/models/estadisticas.model';
import { AuthService } from 'src/app/firebase/auth.service';




@Component({
  selector: 'app-pantalla-admin',
  templateUrl: './pantalla-admin.page.html',
  styleUrls: ['./pantalla-admin.page.scss'],
})
export class PantallaAdminPage implements OnInit  {
  tickets: Ticket[] = [];
  estadisticas: Estadisticas = {
    totalTickets: 0,
    pendientes: [],
    resueltos: 0
    };
    loading = true;
    errorMessage = '';



  constructor(
    private router: Router,
    private TicketService: TicketService,

  ) { }

  ngOnInit() {
    this.cargarTickets();

  }

  calcularEstadisticas() {
    this.estadisticas.totalTickets = this.tickets.length;
    this.estadisticas.resueltos = this.tickets.filter(ticket => ticket.resuelto).length;
    this.estadisticas.pendientes = this.tickets.filter(ticket => !ticket.resuelto); // Arreglo de tickets pendientes
  }

  cargarTickets() {
    this.loading = true;
    this.errorMessage = '';
    this.TicketService.obtenerTickets().subscribe({
      next: (tickets: Ticket[]) => {
        this.tickets = tickets;
        this.calcularEstadisticas();
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los tickets. Inténtalo de nuevo más tarde.';
        console.error(err);
        this.loading = false;
      },
    });
  }


  verDetalleTickets(ticketId: string){
    this.router.navigate(['/ticket-detalle', ticketId]);
  }

  actualizarEstado(ticket: Ticket, nuevoEstado: boolean) {
    this.TicketService.actualizarTicket(ticket.id, { resuelto: nuevoEstado })
      .then(() => {
        console.log('Ticket actualizado con éxito');
        this.cargarTickets();
      })
      .catch((err) => {
        console.error('Error al actualizar el estado del ticket:', err);
      });
  }
 }

