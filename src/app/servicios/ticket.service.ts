import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private collectionName = 'tickets';

  constructor(private firestore: AngularFirestore) {}

  obtenerTickets(): Observable<Ticket[]> {
    return this.firestore.collection<Ticket>(this.collectionName).valueChanges({ idField: 'id' });
  }

  obtenerTicketPorId(id: string): Observable<Ticket> {
    return this.firestore.collection<Ticket>(this.collectionName).doc(id).valueChanges();
  }
}
