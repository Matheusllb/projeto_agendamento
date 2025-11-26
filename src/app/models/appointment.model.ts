export interface Appointment {
    idAgendamento?: number;
    idProfissional: number;
    idCliente: number;
    idStatus: number;
    data: string; // YYYY-MM-DD
    horario: string; // HH:mm:ss
    agendamentoInicio?: Date;
    fim?: Date;
    duracao?: string;
    observacoes?: string;
    pausado: boolean;
    duracaoPausa?: string;
    inicioPausa?: Date;
    preco?: number;
    precoVariavel: boolean;
    pago: boolean;
    enviadoLembrete: boolean;
    enviadoConfirmacaoWhatsapp?: string;
    // Populated fields from joins
    profissionalNome?: string;
    clienteNome?: string;
    statusNome?: string;
}
