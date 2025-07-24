import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonItem, IonSelect, IonSelectOption, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common'; // Necessário para diretivas como ngIf, etc.
import { Equipamento } from 'src/app/models/equipamento/equipamento';
import { EquipamentoService } from 'src/app/services/equipamento/equipamento.service';

@Component({
  standalone: true,
  imports: [IonItem, IonSelect, IonSelectOption, IonLabel, CommonModule],
  selector: 'app-equipamento-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EquipamentoSelectComponent),
      multi: true,
    },
  ],
  templateUrl: './equipamento-select.component.html',
  styleUrls: ['./equipamento-select.component.scss'],
})
export class EquipamentoSelectComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() id_cliente: any = null;
  @Output() selecionar = new EventEmitter<number | null>();

  _value: number | null = null;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  equipamentos: Equipamento[] = [];

  constructor(private equipamentoService: EquipamentoService) {}

  writeValue(value: any): void {
    if (value !== undefined) {
      this._value = value;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implementar lógica para desabilitar/habilitar o select se necessário
  }

  async ngOnInit() {
    console.log(this.id_cliente);
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
        this.equipamentos = await this.equipamentoService.getEquipamentoByCliente(novoId);
      } else {
        this.equipamentos = [];
      }
      this._value = null; // Resetar o valor selecionado quando o cliente mudar
      this.onChange(this._value);
      this.onTouched();
    }
  }

  onIonChange(event: CustomEvent) {
    const selectedValue = event.detail.value === '' ? null : event.detail.value;
    this._value = selectedValue;
    this.onChange(this._value);
    this.onTouched();
    this.selecionar.emit(this._value);
  }

  onIonBlur() {
    this.onTouched();
  }
}