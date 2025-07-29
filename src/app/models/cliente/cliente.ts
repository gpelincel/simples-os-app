import { Endereco } from '../endereco/endereco';
import { OrdemServico } from '../ordem-servico/ordem-servico';

export class Cliente {
  public id: number | null;
  public nome: string | null;
  public cnpj: string | null;
  public razao_social: string | null;
  public telefone: string | null;
  public email: string | null;
  public endereco: Endereco | null;
  public ordens_servico!: OrdemServico[];

  constructor(
    nome: string | null = null,
    cnpj: string | null = null,
    razao_social: string | null = null,
    telefone: string | null = null,
    email: string | null = null,
    id: number = 0,
    endereco: Endereco | null = null
  ) {
    this.nome = nome;
    this.cnpj = cnpj;
    this.razao_social = razao_social;
    this.telefone = telefone;
    this.email = email;
    this.id = id;
    this.endereco = endereco;
  }

  public getEndereco(){
    let endereco = '';
    if (this.endereco?.cidade && this.endereco.estado) {
      endereco += `${this.endereco?.cidade ?? "N/A"} - ${this.endereco?.estado ?? "N/A"}`;
    }
    if (this.endereco?.logradouro) {
      endereco += ` | ${this.endereco?.logradouro} Nº ${this.endereco?.numero}`;
    }
    return endereco;
  }
}
