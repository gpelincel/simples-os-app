import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IonItem, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { Equipamento } from 'src/app/models/equipamento/equipamento';
import { EquipamentoService } from 'src/app/services/equipamento/equipamento.service';

@Component({
  standalone: true,
  imports: [IonItem, IonSelect, IonSelectOption],
  selector: 'app-equipamento-select',
  templateUrl: './equipamento-select.component.html',
  styleUrls: ['./equipamento-select.component.scss'],
})
export class EquipamentoSelectComponent implements OnChanges {
  @Input() id_cliente: number | null = null;
  @Input() selected: number | null = null;
  @Output() selecionar = new EventEmitter();
  equipamentos: Equipamento[] = [];

  constructor(private equipamentoService: EquipamentoService) {}

  async ngOnInit() {
    if (this.id_cliente) {
      this.equipamentos = await this.equipamentoService.getEquipamentoByCliente(
        this.id_cliente
      );
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (
      changes['id_cliente'] &&
      changes['id_cliente'].currentValue !== changes['id_cliente'].previousValue
    ) {
      const novoId = changes['id_cliente'].currentValue;

      if (novoId) {
        this.equipamentos =
          await this.equipamentoService.getEquipamentoByCliente(novoId);
      } else {
        this.equipamentos = [];
      }
    }
  }

  selecionarEquipamento(event: any) {
    this.selecionar.emit(event.detail.value);
  }
}
