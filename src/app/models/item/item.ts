export class Item {
  public id: Number | null;
  public quantidade: Number | null;
  public nome: string | null;
  public valor_unitario: number;
  public unidade:any;
  constructor(id: number | null = 1, quantidade: number | null = null, nome: string| null = null, valor_unitario: number = 0, unidade:any = {}) {
    this.quantidade = quantidade;
    this.nome = nome;
    this.valor_unitario = valor_unitario;
    this.unidade = unidade;
    this.id = id;
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
