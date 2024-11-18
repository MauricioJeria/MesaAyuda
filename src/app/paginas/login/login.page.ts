import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/compartidos/header/header.component';
import { FooterComponent } from 'src/app/compartidos/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, HeaderComponent,FooterComponent,
    FormsModule, CommonModule, RouterModule]
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  irARegistrar () {
    this.router.navigate(['/registrar']);
  }
}
