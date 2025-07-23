import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/models/cliente/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import {
  IonSearchbar,
  IonItem,
  IonRadio,
  IonRadioGroup,
  IonList,
  IonSpinner,
} from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    IonSearchbar,
    IonItem,
    IonRadio,
    IonRadioGroup,
    IonList,
    IonSpinner,
    NgIf,
  ],
  selector: 'app-clientes-select',
  templateUrl: './clientes-select.component.html',
  styleUrls: ['./clientes-select.component.scss'],
})
export class ClientesSelectComponent implements OnInit {
  @Output() selecionar = new EventEmitter();
  @Input() selected: number | null = null;
  clientes: Cliente[] = [];
  loaded = false;
  searching = true;

  constructor(private clienteService: ClienteService) {}

  async ngOnInit() {
    if (this.selected) {
      this.clientes = [(await this.clienteService.getByID(this.selected))];
      this.loaded = true;
    }
  }

  async filtrarClientes(event: Event) {
    this.loaded = false;
    this.searching = false;
    const target = event.target as HTMLIonSearchbarElement;
    this.clientes =
      target.value == ''
        ? []
        : (await this.clienteService.getClientes(null, target.value)).data;
    this.loaded = true;
  }

  selecionarCliente(id_cliente: number | null) {
    this.selecionar.emit(id_cliente);
  }
}
