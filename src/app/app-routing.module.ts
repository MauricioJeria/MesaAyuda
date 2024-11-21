import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './paginas/login/login.page';
import { RegistrarPage } from './paginas/registrar/registrar.page';
import { TicketGeneratePage } from './paginas/ticket-generate/ticket-generate.page';
import { TicketListPage } from './paginas/ticket-list/ticket-list.page';

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
    path: '**',
    component: LoginPage
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
