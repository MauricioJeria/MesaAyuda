import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './paginas/login/login.page';
import { RegistrarPage } from './paginas/registrar/registrar.page';
import { TicketGeneratePage } from './paginas/ticket-generate/ticket-generate.page';
import { TicketListPage } from './paginas/ticket-list/ticket-list.page';
import { PantallaAdminPage } from './paginas/pantalla-admin/pantalla-admin.page';
import { PantallaColaboradorPage } from './paginas/pantalla-colaborador/pantalla-colaborador.page';
import { TicketRevisionPage } from './paginas/ticket-revision/ticket-revision.page';
import { TicketDetallePage } from './paginas/ticket-detalle/ticket-detalle.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'registrar',
    component: RegistrarPage
  },
  {
    path: 'ticket-generate',
    component: TicketGeneratePage
  },
  {
    path: 'ticket-list',
    component: TicketListPage
  },
  {
    path: 'pantalla-admin',
    component: PantallaAdminPage
  },
  {
    path: 'pantalla-colaborador',
    component: PantallaColaboradorPage
  },
  {
    path: 'ticket-revision',
    component: TicketRevisionPage
  },
  {
    path: 'ticket-detalle/:id',
    component: TicketDetallePage
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
