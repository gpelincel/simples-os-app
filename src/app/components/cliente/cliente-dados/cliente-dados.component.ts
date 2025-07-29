import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente/cliente';
import { IonItem, IonLabel, IonItemGroup, IonItemDivider } from '@ionic/angular/standalone';

@Component({
  standalone: true,
  imports: [IonItem, IonLabel, IonItemGroup, IonItemDivider],
  selector: 'app-cliente-dados',
  templateUrl: './cliente-dados.component.html',
  styleUrls: ['./cliente-dados.component.scss'],
})
export class ClienteDadosComponent implements OnInit {
  @Input() cliente!:Cliente;
  constructor() {}

  ngOnInit() {}
}
