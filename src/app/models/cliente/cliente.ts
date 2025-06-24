export class Cliente {
  public nome: string | null;
  public cnpj: string | null;
  public razao_social: string | null;
  public telefone: string | null;
  public email: string | null;

  constructor(
    nome: string | null,
    cnpj: string | null,
    razao_social: string | null,
    telefone: string | null,
    email: string | null
  ) {
    this.nome = nome;
    this.cnpj = cnpj;
    this.razao_social = razao_social;
    this.telefone = telefone;
    this.email = email;
  }
}
