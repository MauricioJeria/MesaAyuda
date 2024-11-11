import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketGeneratePage } from './ticket-generate.page';

const routes: Routes = [
  {
    path: '',
    component: TicketGeneratePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketGeneratePageRoutingModule {}
