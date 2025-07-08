import { Cliente } from "../cliente/cliente";
import { Equipamento } from "../equipamento/equipamento";
import { Item } from "../item/item";

export class OrdemServico {
  public titulo: string | null;
  public codigo_compra: string | null;
  public nota_fiscal: string | null;
  public data_inicio: string | null;
  public data_conclusao: string | null;
  public descricao: string | null;
  public id_status: number | null;
  public id_classificacao: number | null;
  public id_cliente: number | null;
  public id_equipamento: number | null;
  public valor_total: number | null;
  public itens: Item[];
  public cliente: Cliente | null;
  public equipamento: Equipamento | null;
  public status: string | null;
  public classificacao: string | null;

  constructor(
    titulo: string | null = null,
    cliente: Cliente | null = null,
    codigo_compra: string | null = null,
    nota_fiscal: string | null = null,
    data_inicio: string | null = null,
    data_conclusao: string | null = null,
    descricao: string | null = null,
    id_status: number | null = null,
    id_classificacao: number | null = null,
    id_cliente: number | null = null,
    id_equipamento: number | null = null,
    equipamento: Equipamento | null = null,
    valor_total: number | null = null,
    itens: Item[] = [],
    status:string|null = null,
    classificacao:string|null = null,
  ) {
    this.titulo = titulo;
    this.codigo_compra = codigo_compra;
    this.nota_fiscal = nota_fiscal;
    this.data_inicio = data_inicio;
    this.data_conclusao = data_conclusao;
    this.descricao = descricao;
    this.id_status = id_status;
    this.id_classificacao = id_classificacao;
    this.id_cliente = id_cliente;
    this.id_equipamento = id_equipamento;
    this.valor_total = valor_total;
    this.cliente = cliente;
    this.itens = itens;
    this.equipamento = equipamento;
    this.status = status;
    this.classificacao = classificacao;
  }

  setStatus(id_status: number | null){
    this.id_status = id_status;
  }

  setClassificacao(id_classificacao: number | null){
    this.id_classificacao = id_classificacao;
  }
}
