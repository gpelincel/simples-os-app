import { Endereco } from '../endereco/endereco';

export class Cliente {
  public id!: number;
  public nome!: string;
  public endereco!: Endereco;
  public razao_social!: string;
  public cnpj!: string;
  public telefone!: string;
  public email!: string;

  constructor() {}
}
