import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonSearchbar,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { ClienteCardComponent } from 'src/app/components/cliente/cliente-card/cliente-card.component';
import { add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenuButton,
    IonButtons,
    ClienteCardComponent,
    IonSearchbar,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonFab,
    IonFabButton,
    RouterLink
  ],
})
export class ClientesPage implements OnInit {
  clientes: any[] = [];
  next_page: String | null = null;
  stopLoading = false;

  

  constructor(private clienteService: ClienteService) {
    addIcons({ add });
  }

  async searchCliente(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value;
    this.clientes = [];
    this.next_page = null;
    this.stopLoading = false;
    this.loadClientes(this.next_page, query == '' ? null : query);
  }

  onIonInfinite(event: any) {
    if (this.clientes.length > 0) {
      this.loadClientes(this.next_page);
    }
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  async loadClientes(next_page: any = null, query: string | null = null) {
    const response = await this.clienteService.getClientes(next_page, query);
    if (next_page == null) {
      if (this.clientes.length == 0) {
        this.stopLoading = false;
        this.clientes = response.data;
      } else {
        this.stopLoading = true;
      }
    } else {
      this.clientes = [...this.clientes, ...response.data];
    }

    this.next_page = response.next_page_url;
  }

  ionViewWillEnter() {
    this.loadClientes();
  }

  ngOnInit() {
    this.loadClientes();
  }
}
