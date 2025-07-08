export class Item {
  public id: Number | null;
  public quantidade: Number | null;
  public nome: string | null;
  public valor_unitario_rs: string | null;
  public valor_unitario: number | null;
  public unidade:any;
  constructor(id: number | null = 1, quantidade: number | null = null, nome: string| null = null, valor_unitario: number | null = null, unidade:any = {}, valor_unitario_rs = null) {
    this.quantidade = quantidade;
    this.nome = nome;
    this.valor_unitario = valor_unitario;
    this.unidade = unidade;
    this.id = id;
    this.valor_unitario_rs = valor_unitario_rs;
  }

  /**
   * getValorBRL
   */
  public getValorBRL() {
    if (this.valor_unitario) {
      return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(this.valor_unitario);
    } else {
      throw new Error("Item não tem valor unitário");
    }
  }
}
