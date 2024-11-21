import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistrarPage } from './registrar.page';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    CompartidosModule

  ],
  declarations: [RegistrarPage],
  exports: [RegistrarPage]
})
export class RegistrarPageModule {}
