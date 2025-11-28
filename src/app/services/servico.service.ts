/**
 * Este serviço gerencia as operações de dados relacionadas aos Serviços oferecidos (Corte, Barba, etc).
 * Ele permite listar, criar e modificar os serviços disponíveis no sistema.
 */
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Servico } from '../models/servico.model';

@Injectable({
    providedIn: 'root'
})
export class ServicoService {
    private apiService = inject(ApiService);
    private readonly endpoint = 'servicos';

    getAll(): Observable<readonly Servico[]> {
        return this.apiService.getWithResponse<Servico[]>(this.endpoint).pipe(
            map(response => response.data || []),
            catchError(error => {
                console.error('Erro ao carregar serviços:', error);
                return of([]);
            })
        );
    }

    getById(id: number): Observable<Servico> {
        return this.apiService.get<Servico>(`${this.endpoint}/${id}`);
    }

    create(servico: Servico): Observable<Servico> {
        return this.apiService.post<Servico>(this.endpoint, servico);
    }

    update(id: number, servico: Servico): Observable<Servico> {
        return this.apiService.put<Servico>(`${this.endpoint}/${id}`, servico);
    }

    delete(id: number): Observable<any> {
        return this.apiService.delete(`${this.endpoint}/${id}`);
    }
}
