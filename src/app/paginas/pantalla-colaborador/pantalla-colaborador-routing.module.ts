import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PantallaColaboradorPage } from './pantalla-colaborador.page';

const routes: Routes = [
  {
    path: '',
    component: PantallaColaboradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PantallaColaboradorPageRoutingModule {}
