import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PantallaColaboradorPageRoutingModule } from './pantalla-colaborador-routing.module';

import { PantallaColaboradorPage } from './pantalla-colaborador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PantallaColaboradorPageRoutingModule
  ],
  declarations: [PantallaColaboradorPage]
})
export class PantallaColaboradorPageModule {}
