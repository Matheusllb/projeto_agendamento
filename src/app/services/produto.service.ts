/**
 * Este serviço gerencia as operações de dados relacionadas aos Produtos.
 * Ele controla o inventário, preços e cadastro de produtos vendidos ou usados.
 */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Produto } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    // Placeholder for future implementation

    buscarTodos(): Observable<readonly Produto[]> {
        return of([]);
    }

    buscarPorId(id: number): Observable<Produto | undefined> {
        return of(undefined);
    }

    criar(product: Produto): Observable<Produto> {
        return of(product);
    }

    alterar(id: number, product: Produto): Observable<Produto> {
        return of(product);
    }

    excluir(id: number): Observable<any> {
        return of({ success: true });
    }
}
