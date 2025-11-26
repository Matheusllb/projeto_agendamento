export interface Service {
    idServicos?: number;
    idEstabelecimento: number;
    idTipoPrecificacao: number;
    nome: string;
    descricao: string;
    preco: number;
    duracao: number; // minutes
    diasFuturosAgendamento?: number;
    ativo: boolean;
}
