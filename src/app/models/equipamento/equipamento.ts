import { Cliente } from '../cliente/cliente';

export class Equipamento {
  public numero_serie: string | null;
  public numero_patrimonio: string | null;
  public nome: string | null;
  public cliente: Cliente | null;

  constructor(
    numero_serie: string | null,
    numero_patrimonio: string | null,
    nome: string | null,
    cliente: Cliente | null
  ) {
    this.numero_serie = numero_serie;
    this.nome = nome;
    this.numero_patrimonio = numero_patrimonio;
    this.cliente = cliente;
  }
}
