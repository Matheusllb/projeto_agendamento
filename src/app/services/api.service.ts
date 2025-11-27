/**
 * Este serviço é um wrapper em torno do HttpClient do Angular.
 * Ele centraliza todas as chamadas HTTP (GET, POST, PUT, DELETE) para a API,
 * padronizando o tratamento de erros e o formato das respostas.
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    count?: number;
    errors?: any[];
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private http = inject(HttpClient);
    private baseUrl = environment.apiUrl;

    // Requisição GET genérica
    get<T>(endpoint: string): Observable<T> {
        return this.http.get<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`)
            .pipe(
                timeout(5000),
                map(response => response.data as T),
                catchError(this.handleError)
            );
    }

    // Requisição GET genérica que retorna resposta completa
    getWithResponse<T>(endpoint: string): Observable<ApiResponse<T>> {
        const url = `${this.baseUrl}/${endpoint}`;
        console.log(`ApiService: Solicitação de GET para ${url}`);
        return this.http.get<ApiResponse<T>>(url)
            .pipe(
                timeout(5000),
                tap(response => console.log(`ApiService: Resposta para ${endpoint}:`, response)),
                catchError(this.handleError)
            );
    }

    // Requisição POST genérica
    post<T>(endpoint: string, data: any): Observable<T> {
        return this.http.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, data)
            .pipe(
                timeout(5000),
                map(response => response.data as T),
                catchError(this.handleError)
            );
    }

    // Requisição PUT genérica
    put<T>(endpoint: string, data: any): Observable<T> {
        return this.http.put<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, data)
            .pipe(
                timeout(5000),
                map(response => response.data as T),
                catchError(this.handleError)
            );
    }

    // Requisição PATCH genérica
    patch<T>(endpoint: string, data: any): Observable<T> {
        return this.http.patch<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, data)
            .pipe(
                timeout(5000),
                map(response => response.data as T),
                catchError(this.handleError)
            );
    }

    // Requisição DELETE genérica
    delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`)
            .pipe(
                timeout(5000),
                map(response => response.data as T),
                catchError(this.handleError)
            );
    }

    // Tratamento de erros
    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Ocorreu um erro desconhecido';

        if (error.error instanceof ErrorEvent) {
            // Erro do lado do cliente
            errorMessage = `Erro: ${error.error.message}`;
        } else {
            // Erro do lado do servidor
            errorMessage = error.error?.message || `Erro ${error.status}: ${error.statusText}`;
        }

        console.error('API Error:', errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}
