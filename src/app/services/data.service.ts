import { Injectable, inject } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map, catchError, finalize } from 'rxjs/operators';

import { Professional } from '../models/professional.model';
import { Service } from '../models/service.model';
import { Client } from '../models/client.model';
import { Appointment } from '../models/appointment.model';
import { Product } from '../models/product.model';
import { ApiService, ApiResponse } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private apiService = inject(ApiService);

    // Loading states
    loading$ = new BehaviorSubject<boolean>(false);

    // Professionals
    getProfessionals(): Observable<Professional[]> {
        this.loading$.next(true);
        return this.apiService.getWithResponse<Professional[]>('professionals').pipe(
            map(response => response.data || []),
            catchError(error => {
                console.error('Error loading professionals:', error);
                return of([]);
            }),
            finalize(() => this.loading$.next(false))
        );
    }

    getProfessional(id: number): Observable<Professional> {
        return this.apiService.get<Professional>(`professionals/${id}`);
    }

    addProfessional(professional: Professional): Observable<Professional> {
        return this.apiService.post<Professional>('professionals', professional);
    }

    updateProfessional(id: number, professional: Professional): Observable<Professional> {
        return this.apiService.put<Professional>(`professionals/${id}`, professional);
    }

    deleteProfessional(id: number): Observable<any> {
        return this.apiService.delete(`professionals/${id}`);
    }

    // Services
    getServices(): Observable<Service[]> {
        this.loading$.next(true);
        return this.apiService.getWithResponse<Service[]>('services').pipe(
            map(response => response.data || []),
            catchError(error => {
                console.error('Error loading services:', error);
                return of([]);
            }),
            finalize(() => this.loading$.next(false))
        );
    }

    getService(id: number): Observable<Service> {
        return this.apiService.get<Service>(`services/${id}`);
    }

    addService(service: Service): Observable<Service> {
        return this.apiService.post<Service>('services', service);
    }

    updateService(id: number, service: Service): Observable<Service> {
        return this.apiService.put<Service>(`services/${id}`, service);
    }

    deleteService(id: number): Observable<any> {
        return this.apiService.delete(`services/${id}`);
    }

    // Clients
    getClients(): Observable<Client[]> {
        this.loading$.next(true);
        return this.apiService.getWithResponse<Client[]>('clients').pipe(
            map(response => response.data || []),
            catchError(error => {
                console.error('Error loading clients:', error);
                return of([]);
            }),
            finalize(() => this.loading$.next(false))
        );
    }

    getClient(id: number): Observable<Client> {
        return this.apiService.get<Client>(`clients/${id}`);
    }

    addClient(client: Client): Observable<Client> {
        return this.apiService.post<Client>('clients', client);
    }

    updateClient(id: number, client: Client): Observable<Client> {
        return this.apiService.put<Client>(`clients/${id}`, client);
    }

    deleteClient(id: number): Observable<any> {
        return this.apiService.delete(`clients/${id}`);
    }

    // Appointments
    getAppointments(filters?: any): Observable<Appointment[]> {
        this.loading$.next(true);
        let endpoint = 'appointments';
        if (filters) {
            const params = new URLSearchParams(filters).toString();
            endpoint += `?${params}`;
        }
        return this.apiService.getWithResponse<Appointment[]>(endpoint).pipe(
            map(response => response.data || []),
            catchError(error => {
                console.error('Error loading appointments:', error);
                return of([]);
            }),
            finalize(() => this.loading$.next(false))
        );
    }

    getAppointment(id: number): Observable<Appointment> {
        return this.apiService.get<Appointment>(`appointments/${id}`);
    }

    getAppointmentsByProfessional(idProfissional: number): Observable<Appointment[]> {
        return this.apiService.getWithResponse<Appointment[]>(`appointments/professional/${idProfissional}`).pipe(
            map(response => response.data || []),
            catchError(() => of([]))
        );
    }

    getAppointmentsByClient(idCliente: number): Observable<Appointment[]> {
        return this.apiService.getWithResponse<Appointment[]>(`appointments/client/${idCliente}`).pipe(
            map(response => response.data || []),
            catchError(() => of([]))
        );
    }

    addAppointment(appointment: Appointment): Observable<Appointment> {
        return this.apiService.post<Appointment>('appointments', appointment);
    }

    updateAppointment(id: number, appointment: Appointment): Observable<Appointment> {
        return this.apiService.put<Appointment>(`appointments/${id}`, appointment);
    }

    updateAppointmentStatus(id: number, idStatus: number): Observable<Appointment> {
        return this.apiService.patch<Appointment>(`appointments/${id}/status`, { idStatus });
    }

    deleteAppointment(id: number): Observable<any> {
        return this.apiService.delete(`appointments/${id}`);
    }

    // Products (for future use - not implemented in backend yet)
    getProducts(): Observable<Product[]> {
        return of([]);
    }

    addProduct(product: Product): Observable<Product> {
        return of(product);
    }

    updateProduct(id: number, product: Product): Observable<Product> {
        return of(product);
    }

    deleteProduct(id: number): Observable<any> {
        return of({ success: true });
    }
}
