import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  ],
  selector: 'app-form-os',
  templateUrl: './form-os.component.html',
  styleUrls: ['./form-os.component.scss'],
})
export class FormOsComponent implements OnInit {
  @Output() submit = new EventEmitter();
  @Input() ordem_servico: OrdemServico = new OrdemServico();
  @Input() itens: Item[] = [];
  valor_total: any = '';

  readonly mask = maskitoBrlNormalMask;
  readonly maskPredicate: MaskitoElementPredicate = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  recalculateValor() {
    let total = 0;
    this.itens.map((item: Item) => {
      total += Number(item.quantidade) * maskitoParseNumber(String(item.valor_unitario), BRLMaskParams);
    });

    this.ordem_servico.valor_total = total;
    maskitoStringifyNumber(Number(this.ordem_servico.valor_total), BRLMaskParams);
  }

  constructor() {
    this.itens.push(new Item());
  }

  ngOnInit() {
  }

  addItemInput() {
    let id = this.itens.length + 1;
    this.itens = [...this.itens, new Item(id)];
  }

  selecionarCliente(id_cliente: number | null) {
    this.ordem_servico.id_cliente = id_cliente;
  }

  selecionarEquipamento(id_equipamento: number | null) {
    this.ordem_servico.id_equipamento = id_equipamento;
  }

  selecionarUnidade(id_unidade: any, item: any) {
    item.id_unidade = id_unidade;
  }

  setData(event: Event, prop: string) {
    let target = event.target as HTMLIonDatetimeElement;
    let date = new Date(String(target.value));
    if (prop == 'inicio') {
      this.ordem_servico.data_inicio = date.toLocaleDateString('pt-BR');
    } else {
      this.ordem_servico.data_conclusao = date.toLocaleDateString('pt-BR');
    }
  }

  async onSubmit() {
    this.ordem_servico.itens = this.itens;
    this.ordem_servico.valor_total = maskitoParseNumber(
      this.valor_total,
      BRLMaskParams
    );

    this.submit.emit(this.ordem_servico);
  }
}
