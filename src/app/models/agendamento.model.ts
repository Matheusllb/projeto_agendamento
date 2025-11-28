/**
 * Interface que define a estrutura de dados de um Agendamento.
 * Utilizamos 'readonly' para garantir a imutabilidade dos dados no frontend.
 */
export interface Agendamento {
    readonly idAgendamento?: number;
    readonly idProfissional: number;
    readonly idCliente: number;
    readonly idStatus: number;
    readonly data: string; // YYYY-MM-DD
    readonly horario: string; // HH:mm:ss
    readonly agendamentoInicio?: Date;
    readonly fim?: Date;
    readonly duracao?: string;
    readonly observacoes?: string;
    readonly pausado: boolean;
    readonly duracaoPausa?: string;
    readonly inicioPausa?: Date;
    readonly preco?: number;
    readonly precoVariavel: boolean;
    readonly pago: boolean;
    readonly enviadoLembrete: boolean;
    readonly enviadoConfirmacaoWhatsapp?: string;
    // Campos preenchidos de 'joins'
    readonly profissionalNome?: string;
    readonly clienteNome?: string;
    readonly statusNome?: string;
}
