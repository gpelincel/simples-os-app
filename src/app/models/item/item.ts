import { ItemDTO } from 'src/app/domain/ItemDTO';
import { Money } from '../money/money';

export class Item {
  id: number;
  unidade: any;
  quantidade: number;
  nome: string;
  valor_unitario: Money;

  constructor(itemDTO: ItemDTO) {
    this.quantidade = itemDTO.quantidade;
    this.nome = itemDTO.nome;
    this.valor_unitario = new Money(itemDTO.valor_unitario);
    this.unidade = itemDTO.unidade;
    this.id = itemDTO.id;
  }

  public get id_unidade(): number | null {
    return this.unidade ? this.unidade.id : null;
  }

  toDTO(): ItemDTO {
    return {
      id: this.id,
      unidade: this.unidade,
      quantidade: this.quantidade,
      nome: this.nome,
      valor_unitario: this.valor_unitario.valorRaw,
    };
  }
}
