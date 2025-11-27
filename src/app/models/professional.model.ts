/**
 * Interface que define a estrutura de dados de um Profissional.
 * Utilizamos 'readonly' para garantir a imutabilidade dos dados no frontend,
 * prevenindo alterações acidentais diretas nos objetos.
 */
export interface Professional {
    readonly idProf?: number;
    readonly nome: string;
    readonly telefone: string;
    readonly ativo: boolean;
    readonly diasDaSemana: readonly string[];
    readonly horaEntrada: string;
    readonly almoco: string;
    readonly horaSaida: string;
    readonly foto?: string;
    readonly avaliacao?: number;
    readonly especialidades?: readonly string[];
}

export interface DaySchedule {
    readonly dia: 'SEG' | 'TER' | 'QUA' | 'QUI' | 'SEX' | 'SAB' | 'DOM';
    readonly ativo: boolean;
}
