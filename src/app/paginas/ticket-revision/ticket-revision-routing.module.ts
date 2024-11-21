import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketRevisionPage } from './ticket-revision.page';

const routes: Routes = [
  {
    path: '',
    component: TicketRevisionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketRevisionPageRoutingModule {}
