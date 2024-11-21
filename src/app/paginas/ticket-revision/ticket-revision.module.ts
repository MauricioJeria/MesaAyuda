import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketRevisionPageRoutingModule } from './ticket-revision-routing.module';

import { TicketRevisionPage } from './ticket-revision.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketRevisionPageRoutingModule
  ],
  declarations: [TicketRevisionPage]
})
export class TicketRevisionPageModule {}
