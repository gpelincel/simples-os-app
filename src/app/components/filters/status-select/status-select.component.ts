import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  IonSelect,
  IonSelectOption,
  IonLabel,
} from '@ionic/angular/standalone';
import { CommonModule, NgIf } from '@angular/common';
import { ConfiguracoesService } from 'src/app/services/configuracoes/configuracoes.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: true,
  imports: [IonSelect, IonSelectOption, IonLabel, CommonModule],
  selector: 'app-status-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StatusSelectComponent),
      multi: true,
    },
  ],
  templateUrl: './status-select.component.html',
  styleUrls: ['./status-select.component.scss'],
})
export class StatusSelectComponent implements OnInit, ControlValueAccessor {
  @Input() isFilter: boolean = true;
  @Output() selecionar = new EventEmitter<any>();

  _value: any = null;

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  status: any[] = [];

  constructor(private configService: ConfiguracoesService) {}

  async ngOnInit() {
    this.status = await this.configService.getStatus();
  }

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
