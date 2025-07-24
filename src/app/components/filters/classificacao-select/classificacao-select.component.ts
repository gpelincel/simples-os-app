import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { ConfiguracoesService } from 'src/app/services/configuracoes/configuracoes.service';

@Component({
  standalone: true,
  selector: 'app-classificacao-select',
  templateUrl: './classificacao-select.component.html',
  styleUrls: ['./classificacao-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClassificacaoSelectComponent),
      multi: true,
    },
  ],
  imports: [IonSelect, IonSelectOption],
})
export class ClassificacaoSelectComponent implements OnInit, ControlValueAccessor{
  @Input() isFilter: boolean = true;
  @Output() selecionar = new EventEmitter<any>();

  _value: any = null;

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  classificacoes: any[] = [];

  constructor(private configService: ConfiguracoesService) {}

  async ngOnInit() {
    this.classificacoes = await this.configService.getClassificacao();
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
