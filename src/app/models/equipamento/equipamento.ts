export class Equipamento {
  public id: number | null;
  public numero_serie: string | null;
  public numero_patrimonio: string | null;
  public nome: string | null;
  public id_cliente: number | null;

  constructor(
    id: number | null = null,
    numero_serie: string | null = null,
    numero_patrimonio: string | null = null,
    nome: string | null = null,
    id_cliente: number | null = null
  ) {
    this.id = id;
    this.numero_serie = numero_serie;
    this.nome = nome;
    this.numero_patrimonio = numero_patrimonio;
    this.id_cliente = id_cliente;
  }
}
