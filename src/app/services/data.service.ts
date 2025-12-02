import { Injectable, inject } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map, catchError, finalize } from 'rxjs/operators';

import { Profissional } from '../models/profissional.model';
import { Servico } from '../models/servico.model';
import { Cliente } from '../models/cliente.model';
import { Agendamento } from '../models/agendamento.model';
import { Produto } from '../models/product.model';
import { ApiService, ApiResponse } from './api.service';

@Injectable({
    providedIn: 'root'
})
/**
 * @deprecated Usa serviços específicos (ProfissionalService, ClienteService, etc.) ao invés disso.
 */
export class DataService {
    private apiService = inject(ApiService);

    // Estados de carregamento
    carregando$ = new BehaviorSubject<boolean>(false);

    // Profissionais
    getProfessionals(): Observable<Profissional[]> {
        this.carregando$.next(true);
        console.log('DataService: Buscando profissionais...');
        return this.apiService.buscaComResposta<Profissional[]>('profissionais').pipe(
            tap(response => console.log('DataService: Resposta profissionais:', response)),
            map(response => {
                const data = response.data || [];
                console.log('DataService: Dados mapeados profissionais:', data);
                return data;
            }),
            catchError(error => {
                console.error('Erro ao carregar profissionais:', error);
                return of([]);
            }),
            finalize(() => this.carregando$.next(false))
        );
    }

    getProfessional(id: number): Observable<Profissional> {
        return this.apiService.get<Profissional>(`profissionais/${id}`);
    }

    addProfessional(professional: Profissional): Observable<Profissional> {
        return this.apiService.post<Profissional>('profissionais', professional);
    }

    updateProfessional(id: number, professional: Profissional): Observable<Profissional> {
        return this.apiService.put<Profissional>(`profissionais/${id}`, professional);
    }

    deleteProfessional(id: number): Observable<any> {
        return this.apiService.excluir(`profissionais/${id}`);
    }

    // Serviços
    getServices(): Observable<Servico[]> {
        this.carregando$.next(true);
        console.log('DataService: Buscando serviços...');
        return this.apiService.buscaComResposta<Servico[]>('servicos').pipe(
            tap(response => console.log('DataService: Resposta serviços:', response)),
            map(response => {
                const data = response.data || [];
                console.log('DataService: Dados mapeados serviços:', data);
                return data;
            }),
            catchError(error => {
                console.error('Erro ao carregar serviços:', error);
                return of([]);
            }),
            finalize(() => this.carregando$.next(false))
        );
    }

    getService(id: number): Observable<Servico> {
        return this.apiService.get<Servico>(`servicos/${id}`);
    }

    addService(service: Servico): Observable<Servico> {
        return this.apiService.post<Servico>('servicos', service);
    }

    updateService(id: number, service: Servico): Observable<Servico> {
        return this.apiService.put<Servico>(`servicos/${id}`, service);
    }

    deleteService(id: number): Observable<any> {
        return this.apiService.excluir(`servicos/${id}`);
    }

    // Clientes
    getClients(): Observable<Cliente[]> {
        this.carregando$.next(true);
        console.log('DataService: Buscando clientes...');
        return this.apiService.buscaComResposta<Cliente[]>('clientes').pipe(
            tap(response => console.log('DataService: Resposta clientes:', response)),
            map(response => {
                const data = response.data || [];
                console.log('DataService: Dados mapeados clientes:', data);
                return data;
            }),
            catchError(error => {
                console.error('Erro ao carregar clientes:', error);
                return of([]);
            }),
            finalize(() => this.carregando$.next(false))
        );
    }

    getClient(id: number): Observable<Cliente> {
        return this.apiService.get<Cliente>(`clientes/${id}`);
    }

    addClient(cliente: Cliente): Observable<Cliente> {
        return this.apiService.post<Cliente>('clientes', cliente);
    }

    updateClient(id: number, cliente: Cliente): Observable<Cliente> {
        return this.apiService.put<Cliente>(`clientes/${id}`, cliente);
    }

    deleteClient(id: number): Observable<any> {
        return this.apiService.excluir(`clientes/${id}`);
    }

    // Agendamentos
    getAppointments(filters?: any): Observable<Agendamento[]> {
        this.carregando$.next(true);
        let endpoint = 'agendamentos';
        if (filters) {
            const params = new URLSearchParams(filters).toString();
            endpoint += `?${params}`;
        }
        return this.apiService.buscaComResposta<Agendamento[]>(endpoint).pipe(
            map(response => response.data || []),
            catchError(error => {
                console.error('Erro ao carregar agendamentos:', error);
                return of([]);
            }),
            finalize(() => this.carregando$.next(false))
        );
    }

    getAppointment(id: number): Observable<Agendamento> {
        return this.apiService.get<Agendamento>(`agendamentos/${id}`);
    }

    getAppointmentsByProfessional(idProfissional: number): Observable<Agendamento[]> {
        return this.apiService.buscaComResposta<Agendamento[]>(`agendamentos/professional/${idProfissional}`).pipe(
            map(response => response.data || []),
            catchError(() => of([]))
        );
    }

    getAppointmentsByClient(idCliente: number): Observable<Agendamento[]> {
        return this.apiService.buscaComResposta<Agendamento[]>(`agendamentos/cliente/${idCliente}`).pipe(
            map(response => response.data || []),
            catchError(() => of([]))
        );
    }

    addAppointment(appointment: Agendamento): Observable<Agendamento> {
        return this.apiService.post<Agendamento>('agendamentos', appointment);
    }

    updateAppointment(id: number, appointment: Agendamento): Observable<Agendamento> {
        return this.apiService.put<Agendamento>(`agendamentos/${id}`, appointment);
    }

    updateAppointmentStatus(id: number, idStatus: number): Observable<Agendamento> {
        return this.apiService.patch<Agendamento>(`agendamentos/${id}/status`, { idStatus });
    }

    deleteAppointment(id: number): Observable<any> {
        return this.apiService.excluir(`agendamentos/${id}`);
    }

    // Produtos (para uso futuro - ainda não implementado no backend)
    getProducts(): Observable<Produto[]> {
        return of([]);
    }

    addProduct(product: Produto): Observable<Produto> {
        return of(product);
    }

    updateProduct(id: number, product: Produto): Observable<Produto> {
        return of(product);
    }

    deleteProduct(id: number): Observable<any> {
        return of({ success: true });
    }
}
