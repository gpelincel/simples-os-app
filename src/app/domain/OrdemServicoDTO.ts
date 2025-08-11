import { ItemDTO } from "./ItemDTO";

export interface OrdemServicoDTO{
    id: number;
    titulo:string;
    descricao?:string;
    codigo_compra?:string;
    nota_fiscal?:string;
    data_inicio:Date;
    data_conclusao?:Date;
    data_agendamento?:Date;
    valor_total:number;
    classificacao?:any;
    cliente:any;
    status?:any;
    equipamento?:any;
    itens: ItemDTO[];
    is_assinado_cliente?:boolean;
    is_assinado_tecnico?:boolean;
}