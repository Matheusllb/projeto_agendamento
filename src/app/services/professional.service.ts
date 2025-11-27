/**
 * Este serviço gerencia as operações de dados relacionadas aos Profissionais.
 * Ele segue o padrão Repository, abstraindo a comunicação com a API
 * e fornecendo métodos claros para os componentes (getAll, getById, etc).
 */
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Professional } from '../models/professional.model';

@Injectable({
    providedIn: 'root'
})
export class ProfessionalService {
    private apiService = inject(ApiService);
    private readonly endpoint = 'professionals';

    getAll(): Observable<readonly Professional[]> {
        return this.apiService.getWithResponse<Professional[]>(this.endpoint).pipe(
            map(response => response.data || []),
            catchError(error => {
                console.error('Erro ao carregar profissionais:', error);
                return of([]);
            })
        );
    }

    getById(id: number): Observable<Professional> {
        return this.apiService.get<Professional>(`${this.endpoint}/${id}`);
    }

    create(professional: Professional): Observable<Professional> {
        return this.apiService.post<Professional>(this.endpoint, professional);
    }

    update(id: number, professional: Professional): Observable<Professional> {
        return this.apiService.put<Professional>(`${this.endpoint}/${id}`, professional);
    }

    delete(id: number): Observable<any> {
        return this.apiService.delete(`${this.endpoint}/${id}`);
    }
}
