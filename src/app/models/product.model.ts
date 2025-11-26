export interface Product {
    idProduto?: number;
    nome: string;
    descricao?: string;
    categoria: string;
    estoqueQuantidade: number;
    estoqueMinimo: number;
    precoCusto?: number;
    precoVenda: number;
    unidade: string;
    ativo: boolean;
}
