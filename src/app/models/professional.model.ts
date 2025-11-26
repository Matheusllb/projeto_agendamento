export interface Professional {
    idProf?: number;
    nome: string;
    telefone: string;
    ativo: boolean;
    diasDaSemana: string[];
    horaEntrada: string;
    almoco: string;
    horaSaida: string;
    foto?: string;
    avaliacao?: number;
    especialidades?: string[];
}

export interface DaySchedule {
    dia: 'SEG' | 'TER' | 'QUA' | 'QUI' | 'SEX' | 'SAB' | 'DOM';
    ativo: boolean;
}
