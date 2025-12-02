/**
 * Este componente gerencia a tela de Profissionais.
 * Ele permite listar, adicionar, editar e remover profissionais,
 * delegando a lógica de dados para o ProfissionalService.
 */
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfissionalService } from '../../services/profissional.service';
import { Profissional } from '../../models/profissional.model';
import { LucideAngularModule, Plus, Trash2, Edit, Star, User, Search } from 'lucide-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profissionais',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  template: `
    <div class="page-header">
      <h2>Profissionais</h2>
      <button class="btn btn-primary" (click)="abrirFormulario()">
        <lucide-icon [img]="Adicionar" class="w-4 h-4 mr-2"></lucide-icon> Novo Profissional
      </button>
    </div>

    <!-- Busca -->
    <div class="mb-6 relative" *ngIf="!exibirFormulario">
        <lucide-icon [img]="Buscar" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></lucide-icon>
        <input type="text" placeholder="Buscar por nome, telefone ou profissional..." class="form-control pl-10">
    </div>

    <!-- Carregamento -->
    <div *ngIf="carregando$ | async" class="flex justify-center items-center py-12">
      <div class="text-gray-500">Carregando...</div>
    </div>

    <!-- Erro -->
    <div *ngIf="mensagemDeErro" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
      {{ mensagemDeErro }}
    </div>

    <!-- Lista -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" *ngIf="!exibirFormulario && !(carregando$ | async)">
      <div class="card flex flex-col gap-4" *ngFor="let prof of professionais$ | async">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full bg-primary-light text-primary flex items-center justify-center overflow-hidden">
            <img *ngIf="prof.foto" [src]="prof.foto" alt="Avatar" class="w-full h-full object-cover">
            <lucide-icon *ngIf="!prof.foto" [img]="Usuario" size="32"></lucide-icon>
          </div>
          <div>
            <h3 class="font-bold text-lg text-gray-800">{{ prof.nome }}</h3>
            <span class="text-text-secondary text-sm block" *ngIf="prof.especialidades && prof.especialidades.length > 0">
              {{ prof.especialidades.join(', ') }}
            </span>
            <div class="flex items-center gap-1 mt-1 font-semibold text-gray-700" *ngIf="prof.avaliacao">
              <lucide-icon [img]="Avaliacao" size="14" fill="gold" stroke="none"></lucide-icon>
              <span>{{ prof.avaliacao }}</span>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-auto pt-4 border-t border-gray-100">
          <button class="btn-icon" (click)="editarProfissional(prof)">
            <lucide-icon [img]="Editar" size="18"></lucide-icon>
          </button>
          <button class="btn-icon danger" (click)="deletarProfissional(prof.idProf!)">
            <lucide-icon [img]="Remover" size="18"></lucide-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- Formulário -->
    <div class="max-w-2xl mx-auto card" *ngIf="exibirFormulario">
      <h3 class="text-xl font-bold mb-6">{{ estaEditando ? 'Editar' : 'Novo' }} Profissional</h3>
      <form [formGroup]="profForm" (ngSubmit)="salvarProfissional()" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium text-gray-600">Nome</label>
          <input type="text" formControlName="nome" class="form-control">
        </div>
        <div>
          <label class="block mb-1 font-medium text-gray-600">Telefone</label>
          <input type="text" formControlName="telefone" class="form-control">
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block mb-1 font-medium text-gray-600">Hora Entrada</label>
            <input type="time" formControlName="horaEntrada" class="form-control">
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-600">Almoço</label>
            <input type="time" formControlName="almoco" class="form-control">
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-600">Hora Saída</label>
            <input type="time" formControlName="horaSaida" class="form-control">
          </div>
        </div>
        <div>
          <label class="block mb-1 font-medium text-gray-600">Avaliação (1-5)</label>
          <input type="number" formControlName="avaliacao" class="form-control" min="1" max="5" step="0.1">
        </div>
        
        <div class="flex justify-end gap-3 mt-6">
          <button type="button" class="btn btn-secondary" (click)="cancelarFormulario()">Cancelar</button>
          <button type="submit" class="btn btn-primary" [disabled]="profForm.invalid || salvando">
            {{ salvando ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class ProfissionaisComponent implements OnInit {
  private fb = inject(FormBuilder);
  private profissionalService = inject(ProfissionalService);

  readonly Adicionar = Plus;
  readonly Remover = Trash2;
  readonly Editar = Edit;
  readonly Avaliacao = Star;
  readonly Usuario = User;
  readonly Buscar = Search;

  professionais$!: Observable<readonly Profissional[]>;
  carregando$ = new BehaviorSubject<boolean>(false);

  exibirFormulario = false;
  estaEditando = false;
  editandoId: number | null = null;
  mensagemDeErro = '';
  salvando = false;

  profForm: FormGroup;

  constructor() {
    this.profForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      horaEntrada: ['09:00:00', Validators.required],
      almoco: ['12:00:00', Validators.required],
      horaSaida: ['18:00:00', Validators.required],
      avaliacao: [5, [Validators.min(1), Validators.max(5)]],
      ativo: [true],
      diasDaSemana: [[]],
      especialidades: [[]]
    });
  }

  ngOnInit() {
    this.buscarTodos();
  }

  buscarTodos() {
    this.carregando$.next(true);
    this.profissionalService.buscarTodos().pipe(
      finalize(() => this.carregando$.next(false))
    ).subscribe({
      next: (data) => {
        this.professionais$ = new BehaviorSubject(data).asObservable();
      },
      error: (error) => {
        console.error('Erro ao carregar profissionais:', error);
        this.mensagemDeErro = 'Erro ao carregar profissionais';
      }
    });
  }

  abrirFormulario() {
    this.exibirFormulario = true;
    this.estaEditando = false;
    this.profForm.reset({
      horaEntrada: '09:00:00',
      almoco: '12:00:00',
      horaSaida: '18:00:00',
      avaliacao: 5,
      ativo: true,
      diasDaSemana: [],
      especialidades: []
    });
  }

  editarProfissional(prof: Profissional) {
    this.exibirFormulario = true;
    this.estaEditando = true;
    this.editandoId = prof.idProf!;
    this.profForm.patchValue({
      nome: prof.nome,
      telefone: prof.telefone,
      horaEntrada: prof.horaEntrada,
      almoco: prof.almoco,
      horaSaida: prof.horaSaida,
      avaliacao: prof.avaliacao,
      ativo: prof.ativo,
      diasDaSemana: prof.diasDaSemana || [],
      especialidades: prof.especialidades || []
    });
  }

  cancelarFormulario() {
    this.exibirFormulario = false;
    this.editandoId = null;
    this.mensagemDeErro = '';
  }

  salvarProfissional() {
    if (this.profForm.valid) {
      this.salvando = true;
      this.mensagemDeErro = '';
      const formValue = this.profForm.value;

      const profissional: Profissional = {
        ...formValue,
        diasDaSemana: formValue.diasDaSemana || [],
        especialidades: formValue.especialidades || []
      };

      const operation = this.estaEditando && this.editandoId
        ? this.profissionalService.alterar(this.editandoId, profissional)
        : this.profissionalService.criar(profissional);

      operation.subscribe({
        next: () => {
          this.salvando = false;
          this.cancelarFormulario();
          this.buscarTodos();
        },
        error: (error) => {
          this.salvando = false;
          this.mensagemDeErro = error.message || 'Erro ao salvar profissional';
        }
      });
    }
  }

  deletarProfissional(id: number) {
    if (confirm('Tem certeza que deseja desativar este profissional?')) {
      this.profissionalService.excluir(id).subscribe({
        next: () => {
          this.buscarTodos();
        },
        error: (error) => {
          this.mensagemDeErro = error.message || 'Erro ao excluir profissional';
        }
      });
    }
  }
}
