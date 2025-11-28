/**
 * Este serviço gerencia as operações de dados relacionadas aos Clientes.
 * Ele centraliza a lógica de busca, criação e edição de clientes,
 * mantendo os componentes livres de detalhes de implementação da API.
 */
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Cliente } from '../models/cliente.model';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private apiService = inject(ApiService);
    private readonly endpoint = 'clientes';

    getAll(): Observable<readonly Cliente[]> {
        return this.apiService.getWithResponse<Cliente[]>(this.endpoint).pipe(
            map(response => response.data || []),
            catchError(error => {
                console.error('Erro ao carregar clientes:', error);
                return of([]);
            })
        );
    }

    getById(id: number): Observable<Cliente> {
        return this.apiService.get<Cliente>(`${this.endpoint}/${id}`);
    }

    create(cliente: Cliente): Observable<Cliente> {
        return this.apiService.post<Cliente>(this.endpoint, cliente);
    }

    update(id: number, cliente: Cliente): Observable<Cliente> {
        return this.apiService.put<Cliente>(`${this.endpoint}/${id}`, cliente);
    }

    delete(id: number): Observable<any> {
        return this.apiService.delete(`${this.endpoint}/${id}`);
    }
}
