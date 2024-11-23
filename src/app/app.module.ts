import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CompartidosModule } from './compartidos/compartidos.module';
import { LoginPage } from './paginas/login/login.page';
import { RegistrarPage } from './paginas/registrar/registrar.page';
import { TicketGeneratePage } from './paginas/ticket-generate/ticket-generate.page';
import { TicketListPage } from './paginas/ticket-list/ticket-list.page';
import { FormsModule } from '@angular/forms';
import { PantallaAdminPage } from './paginas/pantalla-admin/pantalla-admin.page';
import { PantallaColaboradorPage } from './paginas/pantalla-colaborador/pantalla-colaborador.page';
import { TicketRevisionPage } from './paginas/ticket-revision/ticket-revision.page';
import { TicketDetallePage } from './paginas/ticket-detalle/ticket-detalle.page';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [AppComponent,
    LoginPage,
    RegistrarPage,
    TicketGeneratePage,
    TicketListPage,
    PantallaAdminPage,
    PantallaColaboradorPage,
    TicketRevisionPage,
    TicketDetallePage



  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicModule,
    CommonModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    CompartidosModule,
    FormsModule,
    RouterModule

  ],
  exports: [AppComponent],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
