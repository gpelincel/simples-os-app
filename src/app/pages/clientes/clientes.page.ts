import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonSearchbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ClienteCardComponent } from 'src/app/components/cliente/cliente-card/cliente-card.component';
import {addCircle} from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonButtons, ClienteCardComponent, IonSearchbar, IonButton, IonIcon]
})
export class ClientesPage implements OnInit {

  constructor() { 
    addIcons({ addCircle });
  }

  ngOnInit() {
  }

}
