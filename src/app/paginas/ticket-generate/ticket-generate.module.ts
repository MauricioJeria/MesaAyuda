import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketGeneratePageRoutingModule } from './ticket-generate-routing.module';

import { TicketGeneratePage } from './ticket-generate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

  ],
  declarations: [TicketGeneratePage]
})
export class TicketGeneratePageModule {}
