import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PantallaAdminPage } from './pantalla-admin.page';

const routes: Routes = [
  {
    path: '',
    component: PantallaAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PantallaAdminPageRoutingModule {}
