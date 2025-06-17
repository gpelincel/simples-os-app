import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonSearchbar, IonButton, IonIcon, IonItem } from '@ionic/angular/standalone';
import { ClienteCardComponent } from 'src/app/components/cliente/cliente-card/cliente-card.component';
import {addCircle} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonButtons, ClienteCardComponent, IonSearchbar, IonButton, IonIcon, IonItem, NgForOf]
})
export class ClientesPage implements OnInit {

  clientes: any[] = [];

  constructor(private clienteService: ClienteService) { 
    addIcons({ addCircle });
  }

  async ngOnInit() {
    this.clientes = await this.clienteService.getClientes();
  }

}
