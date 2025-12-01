/**
 * Este componente gerencia a tela de Clientes.
 * Ele permite listar, adicionar, editar e remover clientes,
 * transferindo a lógica de dados para o ClienteService, que faz as requisições HTTP para a API.
 */
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { LucideAngularModule, Plus, Trash2, Edit, Search, History } from 'lucide-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  template: `
    <div class="page-header">
      <h2>Clientes</h2>
      <button class="btn btn-primary" (click)="abrirFormulario()">
        <lucide-icon [img]="Adicionar" class="w-4 h-4 mr-2"></lucide-icon> Novo Cliente
      </button>
    </div>

    <!-- Carregamento -->
    <div *ngIf="loading$ | async" class="flex justify-center items-center py-12">
      <div class="text-gray-500">Carregando...</div>
    </div>

    <!-- Erro -->
    <div *ngIf="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
      {{ errorMessage }}
    </div>

    <!-- Busca -->
    <div class="mb-6 relative" *ngIf="!showForm">
      <lucide-icon [img]="Buscar" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></lucide-icon>
      <input type="text" placeholder="Buscar por nome, telefone ou email..." class="form-control pl-10">
    </div>

    <!-- Lista (Tabela) -->
    <div class="card overflow-hidden p-0" *ngIf="!showForm && !(loading$ | async)">
      <div class="overflow-x-auto">
        <table class="data-table w-full">
          <thead>
            <tr>
              <th class="text-left p-4 bg-gray-50 font-semibold text-gray-600">Nome</th>
              <th class="text-left p-4 bg-gray-50 font-semibold text-gray-600">Telefone</th>
              <th class="text-left p-4 bg-gray-50 font-semibold text-gray-600">Email</th>
              <th class="text-right p-4 bg-gray-50 font-semibold text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let client of clients$ | async" class="border-t border-gray-100 hover:bg-gray-50 transition-colors">
              <td class="p-4 font-medium text-gray-800">{{ client.nome }}</td>
              <td class="p-4 text-gray-600">{{ client.telefone }}</td>
              <td class="p-4 text-gray-600">{{ client.email || '-' }}</td>
              <td class="p-4 text-right">
                <div class="flex justify-end gap-2">
                  <button class="btn-icon" title="Histórico">
                    <lucide-icon [img]="Historico" size="18"></lucide-icon>
                  </button>
                  <button class="btn-icon" (click)="editarCliente(client)">
                    <lucide-icon [img]="Editar" size="18"></lucide-icon>
                  </button>
                  <button class="btn-icon danger" (click)="deletarCliente(client.idCliente!)">
                    <lucide-icon [img]="Remover" size="18"></lucide-icon>
                  </button>
                </div>
              </td>
            </tr>
            <tr *ngIf="(clients$ | async)?.length === 0">
              <td colspan="4" class="p-8 text-center text-gray-500">Nenhum cliente cadastrado.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Formulário -->
    <div class="max-w-2xl mx-auto card" *ngIf="showForm">
      <h3 class="text-xl font-bold mb-6">{{ isEditing ? 'Editar' : 'Novo' }} Cliente</h3>
      <form [formGroup]="clientForm" (ngSubmit)="salvarCliente()" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium text-gray-600">Nome Completo</label>
          <input type="text" formControlName="nome" class="form-control">
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-medium text-gray-600">Telefone</label>
            <input type="text" formControlName="telefone" class="form-control">
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-600">Email (Opcional)</label>
            <input type="email" formControlName="email" class="form-control">
          </div>
        </div>

        <div>
          <label class="block mb-1 font-medium text-gray-600">Observações</label>
          <textarea formControlName="observacoes" class="form-control" rows="3"></textarea>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button type="button" class="btn btn-secondary" (click)="cancelarFormulario()">Cancelar</button>
          <button type="submit" class="btn btn-primary" [disabled]="clientForm.invalid || saving">
            {{ saving ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class ClientesComponent implements OnInit {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);

  readonly Adicionar = Plus;
  readonly Remover = Trash2;
  readonly Editar = Edit;
  readonly Buscar = Search;
  readonly Historico = History;

  clients$!: Observable<readonly Cliente[]>;
  loading$ = new BehaviorSubject<boolean>(false);

  showForm = false;
  isEditing = false;
  editingId: number | null = null;
  errorMessage = '';
  saving = false;

  clientForm: FormGroup;

  constructor() {
    this.clientForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.email]],
      observacoes: ['']
    });
  }

  ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.loading$.next(true);
    this.clienteService.getAll().pipe(
      finalize(() => this.loading$.next(false))
    ).subscribe({
      next: (data) => {
        this.clients$ = new BehaviorSubject(data).asObservable();
      },
      error: (error) => {
        console.error('Erro ao carregar clientes:', error);
        this.errorMessage = 'Erro ao carregar clientes';
      }
    });
  }

  abrirFormulario() {
    this.showForm = true;
    this.isEditing = false;
    this.clientForm.reset();
  }

  editarCliente(client: Cliente) {
    this.showForm = true;
    this.isEditing = true;
    this.editingId = client.idCliente!;
    this.clientForm.patchValue(client);
  }

  cancelarFormulario() {
    this.showForm = false;
    this.editingId = null;
    this.errorMessage = '';
  }

  salvarCliente() {
    if (this.clientForm.valid) {
      this.saving = true;
      this.errorMessage = '';
      const cliente: Cliente = this.clientForm.value;

      const operation = this.isEditing && this.editingId
        ? this.clienteService.update(this.editingId, cliente)
        : this.clienteService.create(cliente);

      operation.subscribe({
        next: () => {
          this.saving = false;
          this.cancelarFormulario();
          this.carregarClientes();
        },
        error: (error) => {
          this.saving = false;
          this.errorMessage = error.message || 'Erro ao salvar cliente';
        }
      });
    }
  }

  deletarCliente(id: number) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clienteService.delete(id).subscribe({
        next: () => {
          this.carregarClientes();
        },
        error: (error) => {
          this.errorMessage = error.message || 'Erro ao excluir cliente';
        }
      });
    }
  }
}
