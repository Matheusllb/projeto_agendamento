export interface Service {
    idServicos?: number;
    idEstabelecimento: number;
    idTipoPrecificacao: number;
    nome: string;
    descricao: string;
    preco: number;
    duracao: number; // minutos
    diasFuturosAgendamento?: number;
    ativo: boolean;
}
