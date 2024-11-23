import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

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
  selector: 'app-ticket-generate',
  templateUrl: './ticket-generate.page.html',
  styleUrls: ['./ticket-generate.page.scss'],
})
export class TicketGeneratePage{
  ticket: Ticket = {
    title: '',
    description: '',
    priority: '',
    createdAt: new Date(),
    status: 'abierto',
    createdBy: ''
  };

  uploadedFiles: File[] = [];

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}



  onFileSelected(event: any): void {
    this.uploadedFiles = event.target.files ? Array.from(event.target.files) : [];
  }

  async onSubmitTicket(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Creando ticket...'
    });
    await loading.present();

    try {

      const attachmentUrls = await this.uploadAttachments();
      this.ticket.attachments = attachmentUrls;


      const ticketRef = await this.firestore.collection('tickets').add(this.ticket);

      await loading.dismiss();
      await this.presentToast('Ticket creado exitosamente', 'success');
      this.router.navigate(['/pantalla-colaborador']);
    } catch (error) {
      await loading.dismiss();
      await this.presentToast('Error al crear ticket', 'danger');
      console.error('Error creating ticket:', error);
    }
  }

  private async uploadAttachments(): Promise<string[]> {
    if (!this.uploadedFiles.length) return [];

    const uploadPromises = this.uploadedFiles.map(file => {
      const filePath = `ticket_attachments/${new Date().getTime()}_${file.name}`;
      return this.storage.upload(filePath, file).then(
        uploadTask => uploadTask.ref.getDownloadURL()
      );
    });

    return Promise.all(uploadPromises);
  }

  private async presentToast(message: string, color: 'success' | 'danger'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }
}
