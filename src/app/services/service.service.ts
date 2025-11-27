/**
 * Este serviço gerencia as operações de dados relacionadas aos Serviços oferecidos (Corte, Barba, etc).
 * Ele permite listar, criar e modificar os serviços disponíveis no sistema.
 */
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Service } from '../models/service.model';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    private apiService = inject(ApiService);
    private readonly endpoint = 'services';

    getAll(): Observable<readonly Service[]> {
        return this.apiService.getWithResponse<Service[]>(this.endpoint).pipe(
            map(response => response.data || []),
            catchError(error => {
                console.error('Erro ao carregar serviços:', error);
                return of([]);
            })
        );
    }

    getById(id: number): Observable<Service> {
        return this.apiService.get<Service>(`${this.endpoint}/${id}`);
    }

    create(service: Service): Observable<Service> {
        return this.apiService.post<Service>(this.endpoint, service);
    }

    update(id: number, service: Service): Observable<Service> {
        return this.apiService.put<Service>(`${this.endpoint}/${id}`, service);
    }

    delete(id: number): Observable<any> {
        return this.apiService.delete(`${this.endpoint}/${id}`);
    }
}
