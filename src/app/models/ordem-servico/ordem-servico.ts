import { OrdemServicoDTO } from 'src/app/domain/OrdemServicoDTO';
import { Money } from '../money/money';
import { ItemDTO } from 'src/app/domain/ItemDTO';
import { Item } from '../item/item';

export class OrdemServico {
  id?: number;
  titulo: string;
  descricao?: string;
  codigo_compra?: string;
  nota_fiscal?: string;
  data_inicio: Date;
  data_conclusao?: Date;
  data_agendamento?: Date;
  valor_total: Money;

  cliente: any;
  equipamento?: any;
  status?: any;
  classificacao?: any;
  itens: Item[];

  is_assinado_cliente?:boolean;
  is_assinado_tecnico?:boolean;

  constructor(ordemDTO: OrdemServicoDTO) {
    this.id = ordemDTO.id;
    this.titulo = ordemDTO.titulo;
    this.codigo_compra = ordemDTO.codigo_compra;
    this.nota_fiscal = ordemDTO.nota_fiscal;

    this.data_inicio = this.addOneDay(ordemDTO.data_inicio);
    this.data_conclusao = ordemDTO.data_conclusao
      ? this.addOneDay(ordemDTO.data_conclusao)
      : undefined;
    this.data_agendamento = ordemDTO.data_agendamento
      ? this.addOneDay(ordemDTO.data_agendamento)
      : undefined;

    this.descricao = ordemDTO.descricao;
    this.valor_total = new Money(ordemDTO.valor_total);

    this.cliente = ordemDTO.cliente;
    this.equipamento = ordemDTO.equipamento;
    this.status = ordemDTO.status;
    this.classificacao = ordemDTO.classificacao;
    this.is_assinado_cliente = ordemDTO.is_assinado_cliente;
    this.is_assinado_tecnico = ordemDTO.is_assinado_tecnico;

    this.itens = ordemDTO.itens
      ? ordemDTO.itens.map((item) => new Item(item))
      : [];
  }

  // Função auxiliar para somar 1 dia
  private addOneDay(dateStr: Date): Date {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date;
  }

  get data_inicio_formated(): string {
    return this.data_inicio.toLocaleDateString('pt-br');
  }

  get data_conclusao_formated(): string {
    return this.data_conclusao
      ? this.data_conclusao.toLocaleDateString('pt-br')
      : 'N/A';
  }

  get data_agendamento_formated(): string {
    return this.data_agendamento
      ? this.data_agendamento.toLocaleDateString('pt-br')
      : 'N/A';
  }

  get id_cliente(): number | null {
    return this.cliente?.id ?? null;
  }

  set id_cliente(value: number | null) {
    if (!value) {
      this.cliente = null;
      return;
    }

    if (!this.cliente || this.cliente.id !== value) {
      this.cliente = { id: value };
    }
  }

  get id_equipamento(): number | null {
    return this.equipamento?.id ?? null;
  }

  set id_equipamento(value: number | null) {
    if (!value) {
      this.equipamento = null;
      return;
    }

    if (!this.equipamento || this.equipamento.id !== value) {
      this.equipamento = { id: value };
    }
  }

  get id_status(): number | null {
    return this.status?.id ?? null;
  }

  set id_status(value: number | null) {
    if (!value) {
      this.status = null;
      return;
    }

    if (!this.status || this.status.id !== value) {
      this.status = { id: value };
    }
  }

  get id_classificacao(): number | null {
    return this.classificacao?.id ?? null;
  }

  set id_classificacao(value: number | null) {
    if (!value) {
      this.classificacao = null;
      return;
    }

    if (!this.classificacao || this.classificacao.id !== value) {
      this.classificacao = { id: value };
    }
  }

  toDTO(): OrdemServicoDTO {
    return {
      id: this.id ?? 0,
      titulo: this.titulo,
      descricao: this.descricao,
      codigo_compra: this.codigo_compra,
      nota_fiscal: this.nota_fiscal,
      data_inicio: this.data_inicio,
      data_agendamento: this.data_agendamento,
      data_conclusao: this.data_conclusao,
      valor_total: this.valor_total.valorRaw,
      cliente: this.cliente,
      equipamento: this.equipamento,
      status: this.status,
      classificacao: this.classificacao,
      itens: this.itens.map((item) => item.toDTO()),
    };
  }
}
