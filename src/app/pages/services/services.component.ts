import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Service } from '../../models/service.model';
import { LucideAngularModule, Plus, Trash2, Edit, Clock } from 'lucide-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  template: `
    <div class="page-header">
      <h2>Serviços</h2>
      <button class="btn btn-primary" (click)="openForm()">
        <lucide-icon [img]="Plus" class="w-4 h-4 mr-2"></lucide-icon> Novo Serviço
      </button>
    </div>

    <!-- Loading State -->
    <div *ngIf="loading$ | async" class="flex justify-center items-center py-12">
      <div class="text-gray-500">Carregando...</div>
    </div>

    <!-- Error State -->
    <div *ngIf="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
      {{ errorMessage }}
    </div>

    <!-- List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" *ngIf="!showForm && !(loading$ | async)">
      <div class="card flex flex-col gap-4" *ngFor="let service of services$ | async">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-bold text-lg text-gray-800">{{ service.nome }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ service.descricao }}</p>
            <div class="flex items-center gap-2 text-text-secondary mt-2">
              <lucide-icon [img]="Clock" size="16"></lucide-icon>
              <span>{{ service.duracao }} min</span>
            </div>
          </div>
          <div class="font-bold text-lg text-primary">
            {{ service.preco | currency:'BRL' }}
          </div>
        </div>
        
        <div class="flex justify-end gap-2 mt-auto pt-4 border-t border-gray-100">
          <button class="btn-icon" (click)="editService(service)">
            <lucide-icon [img]="Edit" size="18"></lucide-icon>
          </button>
          <button class="btn-icon danger" (click)="deleteService(service.idServicos!)">
            <lucide-icon [img]="Trash2" size="18"></lucide-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- Form -->
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
export class ServicesComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dataService = inject(DataService);

  readonly Plus = Plus;
  readonly Trash2 = Trash2;
  readonly Edit = Edit;
  readonly Clock = Clock;

  services$!: Observable<Service[]>;
  loading$ = this.dataService.loading$;

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
    this.services$ = this.dataService.getServices();
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

  editService(service: Service) {
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
      const service: Service = this.serviceForm.value;

      const operation = this.isEditing && this.editingId
        ? this.dataService.updateService(this.editingId, service)
        : this.dataService.addService(service);

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
      this.dataService.deleteService(id).subscribe({
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
