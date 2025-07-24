export interface OrdemServicoEntity{
    id: number;
    titulo:string;
    descricao?:string;
    codigo_compra?:string;
    nota_fiscal?:string;
    data_inicio?:Date;
    data_conclusao?:Date;
    valor_total?:number;
    id_classificacao?:number;
    id_cliente?:number;
    id_status?:number;
    id_equipamento?:number;
}