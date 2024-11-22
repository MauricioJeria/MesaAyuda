import { Ticket } from "./ticket.model";

export interface Estadisticas {
  totalTickets: number;
  pendientes: Ticket[];
  resueltos: number;
}
