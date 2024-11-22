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
    }



  constructor(
    private router: Router,
    private TicketService: TicketService,

  ) { }

  ngOnInit() {
    this.cargarTickets();
    this.calcularEstadisticas();
  }

  calcularEstadisticas() {
    this.estadisticas.totalTickets = this.tickets.length;
    this.estadisticas.resueltos = this.tickets.filter(ticket => ticket.resuelto).length;
    this.estadisticas.pendientes = this.tickets.filter(ticket => !ticket.resuelto); // Arreglo de tickets pendientes
  }

    cargarTickets() {
      this.TicketService.obtenerTickets().subscribe((tickets: Ticket[]) => {
        this.tickets = tickets;
        this.calcularEstadisticas();
      });
    }


  verDetalleTickets(ticketId: string){
    this.router.navigate(['/ticket-detalle', ticketId]);
  }
 }

