import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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

    // Generic GET request
    get<T>(endpoint: string): Observable<T> {
        return this.http.get<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`)
            .pipe(
                map(response => response.data as T),
                catchError(this.handleError)
            );
    }

    // Generic GET request that returns full response
    getWithResponse<T>(endpoint: string): Observable<ApiResponse<T>> {
        return this.http.get<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`)
            .pipe(catchError(this.handleError));
    }

    // Generic POST request
    post<T>(endpoint: string, data: any): Observable<T> {
        return this.http.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, data)
            .pipe(
                map(response => response.data as T),
                catchError(this.handleError)
            );
    }

    // Generic PUT request
    put<T>(endpoint: string, data: any): Observable<T> {
        return this.http.put<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, data)
            .pipe(
                map(response => response.data as T),
                catchError(this.handleError)
            );
    }

    // Generic PATCH request
    patch<T>(endpoint: string, data: any): Observable<T> {
        return this.http.patch<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, data)
            .pipe(
                map(response => response.data as T),
                catchError(this.handleError)
            );
    }

    // Generic DELETE request
    delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`)
            .pipe(
                map(response => response.data as T),
                catchError(this.handleError)
            );
    }

    // Error handling
    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Ocorreu um erro desconhecido';

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Erro: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage = error.error?.message || `Erro ${error.status}: ${error.statusText}`;
        }

        console.error('API Error:', errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}
