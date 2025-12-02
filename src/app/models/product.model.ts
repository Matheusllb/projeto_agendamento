/**
 * Interface que define a estrutura de dados de um Produto.
 * Utilizamos 'readonly' para garantir a imutabilidade dos dados no frontend.
 */
export interface Produto {
    readonly idProduto?: number;
    readonly nome: string;
    readonly descricao?: string;
    readonly categoria: string;
    readonly estoqueQuantidade: number;
    readonly estoqueMinimo: number;
    readonly precoCusto?: number;
    readonly precoVenda: number;
    readonly unidade: string;
    readonly ativo: boolean;
}
