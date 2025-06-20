import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { ConfiguracoesService } from 'src/app/services/configuracoes/configuracoes.service';

@Component({
  standalone: true,
  imports: [IonSelect, IonSelectOption],
  selector: 'app-status-select',
  templateUrl: './status-select.component.html',
  styleUrls: ['./status-select.component.scss'],
})
export class StatusSelectComponent implements OnInit {
  @Output() selecionar = new EventEmitter();
  status: any[] = [];

  constructor(private configService: ConfiguracoesService) {}

  onSelecionar(event: Event) {
    const target = event.target as HTMLIonSelectElement;
    if (target.value == "") {
      target.value = null;
    }
    this.selecionar.emit(target.value);
  }

  async ngOnInit() {
    this.status = await this.configService.getStatus();
  }
}
