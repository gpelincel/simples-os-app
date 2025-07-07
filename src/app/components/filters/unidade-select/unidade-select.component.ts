import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {IonSelect, IonSelectOption} from '@ionic/angular/standalone';
import { ConfiguracoesService } from 'src/app/services/configuracoes/configuracoes.service';

@Component({
  standalone: true,
  imports: [IonSelect, IonSelectOption],
  selector: 'app-unidade-select',
  templateUrl: './unidade-select.component.html',
  styleUrls: ['./unidade-select.component.scss'],
})
export class UnidadeSelectComponent  implements OnInit {

  @Output() selecionar = new EventEmitter();
  unidades:any = [];

  constructor(private configService: ConfiguracoesService) { }

  onSelecionar(event: Event) {
    const target = event.target as HTMLIonSelectElement;
    if (target.value == "") {
      target.value = null;
    }
    this.selecionar.emit(target.value);
  }

  async ngOnInit() {
    this.unidades = await this.configService.getUnidades();
  }

}
