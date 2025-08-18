export class Money {
  public valor: number = 0;

    constructor(valor: number | string) {
    if (typeof valor === 'string') {
      const valorLimpo = valor
        .replace(/\./g, '')
        .replace(',', '.')
        .replace(/[^\d.-]/g, '');

      this.valor = parseFloat(valorLimpo) || 0;
    } else {
      this.valor = valor || 0;
    }
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
