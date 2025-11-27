/**
 * Este serviço gerencia as operações de dados relacionadas aos Clientes.
 * Ele centraliza a lógica de busca, criação e edição de clientes,
 * mantendo os componentes livres de detalhes de implementação da API.
 */
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Client } from '../models/client.model';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private apiService = inject(ApiService);
    private readonly endpoint = 'clients';

    getAll(): Observable<readonly Client[]> {
        return this.apiService.getWithResponse<Client[]>(this.endpoint).pipe(
            map(response => response.data || []),
            catchError(error => {
                console.error('Erro ao carregar clientes:', error);
                return of([]);
            })
        );
    }

    getById(id: number): Observable<Client> {
        return this.apiService.get<Client>(`${this.endpoint}/${id}`);
    }

    create(client: Client): Observable<Client> {
        return this.apiService.post<Client>(this.endpoint, client);
    }

    update(id: number, client: Client): Observable<Client> {
        return this.apiService.put<Client>(`${this.endpoint}/${id}`, client);
    }

    delete(id: number): Observable<any> {
        return this.apiService.delete(`${this.endpoint}/${id}`);
    }
}
