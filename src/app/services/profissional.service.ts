/**
 * Este serviço gerencia as operações de dados relacionadas aos Profissionais.
 * Ele segue o padrão Repository, abstraindo a comunicação com a API
 * e fornecendo métodos claros para os componentes (getAll, getById, etc).
 */
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Profissional } from '../models/profissional.model';

@Injectable({
    providedIn: 'root'
})
export class ProfissionalService {
    private apiService = inject(ApiService);
    private readonly endpoint = 'profissionais';

    getAll(): Observable<readonly Profissional[]> {
        return this.apiService.getWithResponse<Profissional[]>(this.endpoint).pipe(
            map(response => response.data || []),
            catchError(error => {
                console.error('Erro ao carregar profissionais:', error);
                return of([]);
            })
        );
    }

    getById(id: number): Observable<Profissional> {
        return this.apiService.get<Profissional>(`${this.endpoint}/${id}`);
    }

    create(profissional: Profissional): Observable<Profissional> {
        return this.apiService.post<Profissional>(this.endpoint, profissional);
    }

    update(id: number, profissional: Profissional): Observable<Profissional> {
        return this.apiService.put<Profissional>(`${this.endpoint}/${id}`, profissional);
    }

    delete(id: number): Observable<any> {
        return this.apiService.delete(`${this.endpoint}/${id}`);
    }
}
