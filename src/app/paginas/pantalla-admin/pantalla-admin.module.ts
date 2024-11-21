import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PantallaAdminPageRoutingModule } from './pantalla-admin-routing.module';

import { PantallaAdminPage } from './pantalla-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PantallaAdminPageRoutingModule
  ],
  declarations: [PantallaAdminPage]
})
export class PantallaAdminPageModule {}
