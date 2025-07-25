export class Money {
  public valor: number = 0;

  constructor(valor: number | string) {
    this.valor =
      typeof valor === 'string'
        ? parseFloat(valor.replace(/[^\d,.-]/g, '').replace(',', '.'))
        : valor;
  }

  public get valorFormated(): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(this.valor);
  }

  public get valorRaw(): number {
    return this.valor;
  }
}
