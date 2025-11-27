/**
 * Interface que define a estrutura de dados de um Cliente.
 * Utilizamos 'readonly' para garantir a imutabilidade dos dados no frontend.
 */
export interface Client {
    readonly idCliente?: number;
    readonly nome: string;
    readonly telefone: string;
    readonly email?: string;
    readonly observacoes?: string;
}
