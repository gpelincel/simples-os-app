export class Equipamento {
  public numero_serie: string | null;
  public numero_patrimonio: string | null;
  public nome: string | null;
  public id_cliente: number | null;

  constructor(
    numero_serie: string | null,
    numero_patrimonio: string | null,
    nome: string | null,
    id_cliente: number | null
  ) {
    this.numero_serie = numero_serie;
    this.nome = nome;
    this.numero_patrimonio = numero_patrimonio;
    this.id_cliente = id_cliente;
  }
}
