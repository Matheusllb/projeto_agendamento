/**
 * Este serviço gerencia as operações de dados relacionadas aos Agendamentos.
 * Ele lida com a criação de novos horários, atualizações de status e consultas
 * por profissional ou cliente.
 */
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Agendamento } from '../models/agendamento.model';

@Injectable({
    providedIn: 'root'
})
export class AgendamentoService {
    private apiService = inject(ApiService);
    private readonly endpoint = 'agendamentos';

    buscarTodos(filters?: any): Observable<readonly Agendamento[]> {
        let url = this.endpoint;
        if (filters) {
            const params = new URLSearchParams(filters).toString();
            url += `?${params}`;
        }
        return this.apiService.buscaComResposta<Agendamento[]>(url).pipe(
            map(response => response.data || []),
            catchError(error => {
                console.error('Erro ao carregar agendamentos:', error);
                return of([]);
            })
        );
    }

    buscarPorId(id: number): Observable<Agendamento> {
        return this.apiService.get<Agendamento>(`${this.endpoint}/${id}`);
    }

    buscarPorProfissional(idProfissional: number): Observable<readonly Agendamento[]> {
        return this.apiService.buscaComResposta<Agendamento[]>(`${this.endpoint}/professional/${idProfissional}`).pipe(
            map(response => response.data || []),
            catchError(() => of([]))
        );
    }

    buscarPorCliente(idCliente: number): Observable<readonly Agendamento[]> {
        return this.apiService.buscaComResposta<Agendamento[]>(`${this.endpoint}/cliente/${idCliente}`).pipe(
            map(response => response.data || []),
            catchError(() => of([]))
        );
    }

    criar(agendamento: Agendamento): Observable<Agendamento> {
        return this.apiService.post<Agendamento>(this.endpoint, agendamento);
    }

    alterar(id: number, agendamento: Agendamento): Observable<Agendamento> {
        return this.apiService.put<Agendamento>(`${this.endpoint}/${id}`, agendamento);
    }

    atualizarStatus(id: number, idStatus: number): Observable<Agendamento> {
        return this.apiService.patch<Agendamento>(`${this.endpoint}/${id}/status`, { idStatus });
    }

    excluir(id: number): Observable<any> {
        return this.apiService.excluir(`${this.endpoint}/${id}`);
    }
}
