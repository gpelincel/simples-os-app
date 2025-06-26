import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/models/cliente/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { IonSearchbar, IonItem, IonRadio, IonRadioGroup, IonList } from '@ionic/angular/standalone';

@Component({
  standalone: true,
  imports: [IonSearchbar, IonItem, IonRadio, IonRadioGroup, IonList],
  selector: 'app-clientes-select',
  templateUrl: './clientes-select.component.html',
  styleUrls: ['./clientes-select.component.scss'],
})
export class ClientesSelectComponent  implements OnInit {

  @Output() selecionar = new EventEmitter();
  clientes : Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {}

  async filtrarClientes(event : Event){
    const target = event.target as HTMLIonSearchbarElement;
    this.clientes = target.value == '' ? [] : (await this.clienteService.getClientes(null, target.value)).data;
  }

  selecionarCliente(id_cliente:number|null){
    this.selecionar.emit(id_cliente);
  }

}
