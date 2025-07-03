export class Item {
  public id: Number | null;
  public quantidade: Number | null;
  public nome: string | null;
  public valor_unitario: Number | null;
  constructor(id: Number | null = 1, quantidade: Number | null = null, nome: string| null = null, valor_unitario: Number| null = null) {
    this.quantidade = quantidade;
    this.nome = nome;
    this.valor_unitario = valor_unitario;
    this.id = id;
  }
}
