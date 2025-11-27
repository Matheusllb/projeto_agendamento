/**
 * Este serviço gerencia as operações de dados relacionadas aos Produtos.
 * Ele controla o inventário, preços e cadastro de produtos vendidos ou usados.
 */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    // Placeholder for future implementation

    getAll(): Observable<readonly Product[]> {
        return of([]);
    }

    getById(id: number): Observable<Product | undefined> {
        return of(undefined);
    }

    create(product: Product): Observable<Product> {
        return of(product);
    }

    update(id: number, product: Product): Observable<Product> {
        return of(product);
    }

    delete(id: number): Observable<any> {
        return of({ success: true });
    }
}
