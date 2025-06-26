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

  constructor(
    titulo: string | null,
    codigo_compra: string | null,
    nota_fiscal: string | null,
    data_inicio: string | null,
    data_conclusao: string | null,
    descricao: string | null,
    id_status: number | null,
    id_classificacao: number | null,
    id_cliente: number | null,
    id_equipamento: number | null
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
  }

  setStatus(id_status: number | null){
    this.id_status = id_status;
  }

  setClassificacao(id_classificacao: number | null){
    this.id_classificacao = id_classificacao;
  }
}
