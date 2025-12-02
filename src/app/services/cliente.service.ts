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

    buscarTodos(): Observable<readonly Cliente[]> {
        return this.apiService.buscaComResposta<Cliente[]>(this.endpoint).pipe(
            map(response => response.data || []),
            catchError(error => {
                console.error('Erro ao carregar clientes:', error);
                return of([]);
            })
        );
    }

    buscarPorId(id: number): Observable<Cliente> {
        return this.apiService.get<Cliente>(`${this.endpoint}/${id}`);
    }

    criar(cliente: Cliente): Observable<Cliente> {
        return this.apiService.post<Cliente>(this.endpoint, cliente);
    }

    alterar(id: number, cliente: Cliente): Observable<Cliente> {
        return this.apiService.put<Cliente>(`${this.endpoint}/${id}`, cliente);
    }

    excluir(id: number): Observable<any> {
        return this.apiService.excluir(`${this.endpoint}/${id}`);
    }
}
