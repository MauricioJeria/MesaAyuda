import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './paginas/login/login.page';
import { RegistrarPage } from './paginas/registrar/registrar.page';
import { TicketGeneratePage } from './paginas/ticket-generate/ticket-generate.page';
import { TicketListPage } from './paginas/ticket-list/ticket-list.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./paginas/inicio/inicio.module').then(m => m.InicioPageModule)
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




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
