import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { ConfiguracoesService } from 'src/app/services/configuracoes/configuracoes.service';

@Component({
  standalone: true,
  selector: 'app-classificacao-select',
  templateUrl: './classificacao-select.component.html',
  styleUrls: ['./classificacao-select.component.scss'],
  imports: [IonSelect, IonSelectOption],
})
export class ClassificacaoSelectComponent implements OnInit {
  @Output() selecionar = new EventEmitter();
  classificacoes: any[] = [];

  constructor(private configService: ConfiguracoesService) {}

  onSelecionar(event: Event) {
    const target = event.target as HTMLIonSelectElement;
    this.selecionar.emit(target.value);
  }

  async ngOnInit() {
    this.classificacoes = await this.configService.getClassificacao();
  }
}
