import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonItem,
  IonInput,
  IonButton,
  IonLabel,
  IonItemGroup,
  IonDatetime,
  IonModal,
  IonDatetimeButton,
  IonTextarea,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { ClientesSelectComponent } from 'src/app/components/filters/clientes-select/clientes-select.component';
import { StatusSelectComponent } from 'src/app/components/filters/status-select/status-select.component';
import { ClassificacaoSelectComponent } from 'src/app/components/filters/classificacao-select/classificacao-select.component';
import { OrdemServico } from 'src/app/models/ordem-servico/ordem-servico';
import { Item } from 'src/app/models/item/item';
import { EquipamentoSelectComponent } from 'src/app/components/equipamento/equipamento-select/equipamento-select.component';
import { UnidadeSelectComponent } from 'src/app/components/filters/unidade-select/unidade-select.component';
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoElementPredicate } from '@maskito/core';
import { BRLMaskParams, maskitoBrlNormalMask } from 'src/app/utils/masks';
import { maskitoParseNumber, maskitoStringifyNumber } from '@maskito/kit';
import { OrdemServicoService } from 'src/app/services/ordem-servico/ordem-servico.service';
import { OrdemServicoEntity } from 'src/app/domain/OrdemServicoEntity';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonItem,
    IonInput,
    IonButton,
    RouterLink,
    ClientesSelectComponent,
    StatusSelectComponent,
    ClassificacaoSelectComponent,
    IonLabel,
    IonItemGroup,
    IonDatetime,
    IonModal,
    IonDatetimeButton,
    EquipamentoSelectComponent,
    UnidadeSelectComponent,
    MaskitoDirective,
    IonTextarea,
    ReactiveFormsModule,
  ],
  selector: 'app-form-os',
  templateUrl: './form-os.component.html',
  styleUrls: ['./form-os.component.scss'],
})
export class FormOsComponent implements OnInit {
  @Output() submit = new EventEmitter();
  @Input() os_form!: FormGroup;
  @Input() ordem_servico: OrdemServicoEntity | null = null;

  readonly mask = maskitoBrlNormalMask;
  readonly maskPredicate: MaskitoElementPredicate = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  recalculateValor() {
    let total = 0;
    const itens = this.os_form.value.itens;

    itens.map((item: any) => {
      total +=
        Number(item.quantidade) *
        maskitoParseNumber(String(item.valor_unitario), BRLMaskParams);
    });

    this.os_form.patchValue({
      valor_total: maskitoStringifyNumber(total, BRLMaskParams),
    });
  }

  get ItemsFormArray() {
    return this.os_form.get('itens') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.addItemInput();
  }

  addItemInput() {
    const novoItem = this.fb.group({
      id: [''],
      quantidade: [''],
      id_unidade: [''],
      nome: [''],
      valor_unitario: [''],
    });

    this.ItemsFormArray.push(novoItem);
  }

  setCliente(id_cliente: number | null) {
    this.os_form.patchValue({
      id_cliente: id_cliente,
    });
  }

  setDataInicio(event: Event) {
    let target = event.target as HTMLIonDatetimeElement;
    let date = new Date(String(target.value));
    this.os_form.patchValue({
      data_inicio: date.toLocaleDateString('pt-BR'),
    });
  }

  setDataConclusao(event: Event) {
    let target = event.target as HTMLIonDatetimeElement;
    let date = new Date(String(target.value));
    this.os_form.patchValue({
      data_conclusao: date.toLocaleDateString('pt-BR'),
    });
  }

  async onSubmit() {
    this.os_form.patchValue({
      valor_total: maskitoParseNumber(this.os_form.value.valor_total, BRLMaskParams),
    });

    this.submit.emit(this.os_form);
  }
}
