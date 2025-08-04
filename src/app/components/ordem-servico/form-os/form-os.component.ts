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
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { ClientesSelectComponent } from 'src/app/components/filters/clientes-select/clientes-select.component';
import { StatusSelectComponent } from 'src/app/components/filters/status-select/status-select.component';
import { ClassificacaoSelectComponent } from 'src/app/components/filters/classificacao-select/classificacao-select.component';
import { EquipamentoSelectComponent } from 'src/app/components/equipamento/equipamento-select/equipamento-select.component';
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoElementPredicate } from '@maskito/core';
import { maskitoBrlNormalMask } from 'src/app/utils/masks';
import { OrdemServicoDTO } from 'src/app/domain/OrdemServicoDTO';
import { Money } from 'src/app/models/money/money';
import { ConfiguracoesService } from 'src/app/services/configuracoes/configuracoes.service';

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
    MaskitoDirective,
    IonTextarea,
    ReactiveFormsModule,
    IonSelect,
    IonSelectOption,
  ],
  selector: 'app-form-os',
  templateUrl: './form-os.component.html',
  styleUrls: ['./form-os.component.scss'],
})
export class FormOsComponent implements OnInit {
  @Output() submit = new EventEmitter();
  @Input() os_form!: FormGroup;
  @Input() ordem_servico?: OrdemServicoDTO;
  unidades: any = [];

  readonly mask = maskitoBrlNormalMask;
  readonly maskPredicate: MaskitoElementPredicate = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  recalculateValor() {
    let total = 0;
    const itens = this.os_form.value.itens;

    itens.map((item: any) => {
      let valor_unitario = new Money(item.valor_unitario);
      total += item.quantidade * valor_unitario.valorRaw;
    });

    this.os_form.patchValue({
      valor_total: new Money(total).valorFormated,
    });
  }

  get ItemsFormArray() {
    return this.os_form.get('itens') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private configService: ConfiguracoesService
  ) {}

  async ngOnInit() {
    this.unidades = await this.configService.getUnidades();

    if (this.ItemsFormArray.length <= 0) {
      this.addItemInput();
    }
  }

  addItemInput() {
    const novoItem = this.fb.group({
      id: [''],
      quantidade: [null],
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

  setStatus(id_status: number | null) {
    this.os_form.patchValue({
      id_status: id_status,
    });
  }

  setEquipamento(id_equipamento: number | null) {
    this.os_form.patchValue({
      id_equipamento: id_equipamento,
    });
  }

  setClassificacao(id_classificacao: number | null) {
    this.os_form.patchValue({
      id_classificacao: id_classificacao,
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

  setDataAgendamento(event: Event) {
    let target = event.target as HTMLIonDatetimeElement;
    let date = new Date(String(target.value));
    this.os_form.patchValue({
      data_agendamento: date.toLocaleDateString('pt-BR'),
    });
  }

  async onSubmit() {
    const ordem_servico = this.os_form.value;

    ordem_servico.data_inicio = ordem_servico.data_inicio.split('T')[0];

    if (ordem_servico.data_conclusao) {
      ordem_servico.data_conclusao = ordem_servico.data_conclusao.split('T')[0];
    }

    if (ordem_servico.data_agendamento) {
      ordem_servico.data_agendamento = ordem_servico.data_agendamento.split('T')[0];
    }

    ordem_servico.valor_total = new Money(ordem_servico.valor_total).valorRaw;
    ordem_servico.itens.map((item: any) => {
      item.valor_unitario = new Money(item.valor_unitario).valorRaw;
    });

    this.submit.emit(ordem_servico);
  }
}
