/**
 * Este componente gerencia a tela de Serviços.
 * Ele permite listar, adicionar, editar e remover serviços oferecidos,
 * delegando a lógica de dados para o ServicoService.
 */
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicoService } from '../../services/servico.service';
import { Servico } from '../../models/servico.model';
import { LucideAngularModule, Plus, Trash2, Edit, Clock } from 'lucide-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  template: `
    <div class="page-header">
      <h2>Serviços</h2>
      <button class="btn btn-primary" (click)="openForm()">
        <lucide-icon [img]="Adicionar" class="w-4 h-4 mr-2"></lucide-icon> Novo Serviço
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

    <!-- Lista -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" *ngIf="!showForm && !(loading$ | async)">
      <div class="card flex flex-col gap-4" *ngFor="let service of services$ | async">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-bold text-lg text-gray-800">{{ service.nome }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ service.descricao }}</p>
            <div class="flex items-center gap-2 text-text-secondary mt-2">
              <lucide-icon [img]="Duracao" size="16"></lucide-icon>
              <span>{{ service.duracao }} min</span>
            </div>
          </div>
          <div class="font-bold text-lg text-primary">
            {{ service.preco | currency:'BRL' }}
          </div>
        </div>
        
        <div class="flex justify-end gap-2 mt-auto pt-4 border-t border-gray-100">
          <button class="btn-icon" (click)="editService(service)">
            <lucide-icon [img]="Editar" size="18"></lucide-icon>
          </button>
          <button class="btn-icon danger" (click)="deleteService(service.idServicos!)">
            <lucide-icon [img]="Remover" size="18"></lucide-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- Formulário -->
    <div class="max-w-2xl mx-auto card" *ngIf="showForm">
      <h3 class="text-xl font-bold mb-6">{{ isEditing ? 'Editar' : 'Novo' }} Serviço</h3>
      <form [formGroup]="serviceForm" (ngSubmit)="saveService()" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium text-gray-600">Nome do Serviço</label>
          <input type="text" formControlName="nome" class="form-control">
        </div>
        
        <div>
          <label class="block mb-1 font-medium text-gray-600">Descrição</label>
          <textarea formControlName="descricao" class="form-control" rows="3"></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-medium text-gray-600">Duração (min)</label>
            <input type="number" formControlName="duracao" class="form-control" step="5">
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-600">Preço (R$)</label>
            <input type="number" formControlName="preco" class="form-control" step="0.01">
          </div>
        </div>
        
        <div class="flex justify-end gap-3 mt-6">
          <button type="button" class="btn btn-secondary" (click)="cancelForm()">Cancelar</button>
          <button type="submit" class="btn btn-primary" [disabled]="serviceForm.invalid || saving">
            {{ saving ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class ServicosComponent implements OnInit {
  private fb = inject(FormBuilder);
  private servicoService = inject(ServicoService);

  readonly Adicionar = Plus;
  readonly Remover = Trash2;
  readonly Editar = Edit;
  readonly Duracao = Clock;

  services$!: Observable<readonly Servico[]>;
  loading$ = new BehaviorSubject<boolean>(false);

  showForm = false;
  isEditing = false;
  editingId: number | null = null;
  errorMessage = '';
  saving = false;

  serviceForm: FormGroup;

  constructor() {
    this.serviceForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      duracao: [30, [Validators.required, Validators.min(5)]],
      preco: [0, [Validators.required, Validators.min(0)]],
      idEstabelecimento: [1],
      idTipoPrecificacao: [1],
      ativo: [true]
    });
  }

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.loading$.next(true);
    this.services$ = this.servicoService.getAll().pipe(
      finalize(() => this.loading$.next(false))
    );
  }

  openForm() {
    this.showForm = true;
    this.isEditing = false;
    this.serviceForm.reset({
      duracao: 30,
      preco: 0,
      idEstabelecimento: 1,
      idTipoPrecificacao: 1,
      ativo: true
    });
  }

  editService(service: Servico) {
    this.showForm = true;
    this.isEditing = true;
    this.editingId = service.idServicos!;
    this.serviceForm.patchValue(service);
  }

  cancelForm() {
    this.showForm = false;
    this.editingId = null;
    this.errorMessage = '';
  }

  saveService() {
    if (this.serviceForm.valid) {
      this.saving = true;
      this.errorMessage = '';
      const servico: Servico = this.serviceForm.value;

      const operation = this.isEditing && this.editingId
        ? this.servicoService.update(this.editingId, servico)
        : this.servicoService.create(servico);

      operation.subscribe({
        next: () => {
          this.saving = false;
          this.cancelForm();
          this.loadServices();
        },
        error: (error) => {
          this.saving = false;
          this.errorMessage = error.message || 'Erro ao salvar serviço';
        }
      });
    }
  }

  deleteService(id: number) {
    if (confirm('Tem certeza que deseja desativar este serviço?')) {
      this.servicoService.delete(id).subscribe({
        next: () => {
          this.loadServices();
        },
        error: (error) => {
          this.errorMessage = error.message || 'Erro ao excluir serviço';
        }
      });
    }
  }
}
