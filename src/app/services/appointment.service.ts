/**
 * Este serviço gerencia as operações de dados relacionadas aos Agendamentos.
 * Ele lida com a criação de novos horários, atualizações de status e consultas
 * por profissional ou cliente.
 */
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Appointment } from '../models/appointment.model';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private apiService = inject(ApiService);
    private readonly endpoint = 'appointments';

    getAll(filters?: any): Observable<readonly Appointment[]> {
        let url = this.endpoint;
        if (filters) {
            const params = new URLSearchParams(filters).toString();
            url += `?${params}`;
        }
        return this.apiService.getWithResponse<Appointment[]>(url).pipe(
            map(response => response.data || []),
            catchError(error => {
                console.error('Erro ao carregar agendamentos:', error);
                return of([]);
            })
        );
    }

    getById(id: number): Observable<Appointment> {
        return this.apiService.get<Appointment>(`${this.endpoint}/${id}`);
    }

    getByProfessional(idProfissional: number): Observable<readonly Appointment[]> {
        return this.apiService.getWithResponse<Appointment[]>(`${this.endpoint}/professional/${idProfissional}`).pipe(
            map(response => response.data || []),
            catchError(() => of([]))
        );
    }

    getByClient(idCliente: number): Observable<readonly Appointment[]> {
        return this.apiService.getWithResponse<Appointment[]>(`${this.endpoint}/client/${idCliente}`).pipe(
            map(response => response.data || []),
            catchError(() => of([]))
        );
    }

    create(appointment: Appointment): Observable<Appointment> {
        return this.apiService.post<Appointment>(this.endpoint, appointment);
    }

    update(id: number, appointment: Appointment): Observable<Appointment> {
        return this.apiService.put<Appointment>(`${this.endpoint}/${id}`, appointment);
    }

    updateStatus(id: number, idStatus: number): Observable<Appointment> {
        return this.apiService.patch<Appointment>(`${this.endpoint}/${id}/status`, { idStatus });
    }

    delete(id: number): Observable<any> {
        return this.apiService.delete(`${this.endpoint}/${id}`);
    }
}
