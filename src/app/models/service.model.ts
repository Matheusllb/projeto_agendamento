/**
 * Interface que define a estrutura de dados de um Serviço (ex: Corte de Cabelo).
 * Utilizamos 'readonly' para garantir a imutabilidade dos dados no frontend.
 */
export interface Service {
    readonly idServicos?: number;
    readonly idEstabelecimento: number;
    readonly idTipoPrecificacao: number;
    readonly nome: string;
    readonly descricao: string;
    readonly preco: number;
    readonly duracao: number; // minutos
    readonly diasFuturosAgendamento?: number;
    readonly ativo: boolean;
}
