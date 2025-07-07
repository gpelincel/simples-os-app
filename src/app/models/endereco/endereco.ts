export class Endereco {
  public logradouro: string | null;
  public numero: number | null;
  public cep: string | null;
  public complemento: string | null;
  public bairro: string | null;
  public cidade: string | null;
  public estado: string | null;

  constructor(
    logradouro: string | null,
    numero: number | null,
    cep: string | null,
    complemento: string | null,
    bairro: string | null,
    cidade: string | null,
    estado: string | null
  ) {
    this.logradouro = logradouro;
    this.numero = numero;
    this.cep = cep;
    this.complemento = complemento;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
  }

  public getEndereco() {
    let endereco = '';
    if (this.cidade && this.estado) {
      endereco += `${this.cidade ?? 'N/A'} - ${
        this.estado ?? 'N/A'
      }`;
    }
    if (this.logradouro) {
      endereco += ` | ${this.logradouro} Nº ${this.numero}`;
    }
    return endereco;
  }
}
