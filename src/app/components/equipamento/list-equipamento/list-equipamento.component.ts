import { Component, Input, OnInit } from '@angular/core';
import {
  
} from '@ionic/angular/standalone';
import { EquipamentoCardComponent } from '../equipamento-card/equipamento-card.component';
import { Equipamento } from 'src/app/models/equipamento/equipamento';


@Component({
  standalone: true,
  imports: [EquipamentoCardComponent, ],
  selector: 'app-list-equipamento',
  templateUrl: './list-equipamento.component.html',
  styleUrls: ['./list-equipamento.component.scss'],
})
export class ListEquipamentoComponent  implements OnInit {

  @Input() equipamentos: Equipamento[] = [];

  constructor() { }

  ngOnInit() {}

}
