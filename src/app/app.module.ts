import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

// Importaciones de Firebase
import { importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { CompartidosModule } from './compartidos/compartidos.module';
import { LoginPage } from './paginas/login/login.page';
import { RegistrarPage } from './paginas/registrar/registrar.page';
import { TicketGeneratePage } from './paginas/ticket-generate/ticket-generate.page';
import { TicketListPage } from './paginas/ticket-list/ticket-list.page';
import { FormsModule } from '@angular/forms';
import { PantallaAdminPage } from './paginas/pantalla-admin/pantalla-admin.page';
import { PantallaColaboradorPage } from './paginas/pantalla-colaborador/pantalla-colaborador.page';
import { TicketRevisionPage } from './paginas/ticket-revision/ticket-revision.page';

@NgModule({
  declarations: [AppComponent,
    LoginPage,
    RegistrarPage,
    TicketGeneratePage,
    TicketListPage,
    PantallaAdminPage,
    PantallaColaboradorPage,
    TicketRevisionPage
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
    FormsModule
  ],
  exports: [AppComponent],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
