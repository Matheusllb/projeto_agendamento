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
import { LucideAngularModule, Plus, Trash2, Edit, Clock, Search } from 'lucide-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  template: `
    <div class="page-header">
      <h2>Serviços</h2>
      <button class="btn btn-primary" (click)="abrirFormulario()">
        <lucide-icon [img]="Adicionar" class="w-4 h-4 mr-2"></lucide-icon> Novo Serviço
      </button>
    </div>

    <!-- Busca -->
    <div class="mb-6 relative" *ngIf="!exibirFormulario">
        <lucide-icon [img]="Buscar" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></lucide-icon>
        <input type="text" placeholder="Buscar por nome, descrição ou preço..." class="form-control pl-10">
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
          <button class="btn-icon" (click)="editarServico(service)">
            <lucide-icon [img]="Editar" size="18"></lucide-icon>
          </button>
          <button class="btn-icon danger" (click)="deletarServico(service.idServicos!)">
            <lucide-icon [img]="Remover" size="18"></lucide-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- Formulário -->
    <div class="max-w-2xl mx-auto card" *ngIf="exibirFormulario">
      <h3 class="text-xl font-bold mb-6">{{ estaEditando ? 'Editar' : 'Novo' }} Serviço</h3>
      <form [formGroup]="servicoForm" (ngSubmit)="salvarServico()" class="space-y-4">
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
          <button type="button" class="btn btn-secondary" (click)="cancelarFormulario()">Cancelar</button>
          <button type="submit" class="btn btn-primary" [disabled]="servicoForm.invalid || salvando">
            {{ salvando ? 'Salvando...' : 'Salvar' }}
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
  readonly Buscar = Search;

  services$!: Observable<readonly Servico[]>;
  carregando$ = new BehaviorSubject<boolean>(false);

  exibirFormulario = false;
  estaEditando = false;
  editandoId: number | null = null;
  mensagemDeErro = '';
  salvando = false;

  servicoForm: FormGroup;

  constructor() {
    this.servicoForm = this.fb.group({
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
    this.carregarServicos();
  }

  carregarServicos() {
    this.carregando$.next(true);
    this.servicoService.buscarTodos().pipe(
      finalize(() => this.carregando$.next(false))
    ).subscribe({
      next: (data) => {
        this.services$ = new BehaviorSubject(data).asObservable();
      },
      error: (error) => {
        console.error('Erro ao carregar serviços:', error);
        this.mensagemDeErro = 'Erro ao carregar serviços';
      }
    });
  }

  abrirFormulario() {
    this.exibirFormulario = true;
    this.estaEditando = false;
    this.servicoForm.reset({
      duracao: 30,
      preco: 0,
      idEstabelecimento: 1,
      idTipoPrecificacao: 1,
      ativo: true
    });
  }

  editarServico(service: Servico) {
    this.exibirFormulario = true;
    this.estaEditando = true;
    this.editandoId = service.idServicos!;
    this.servicoForm.patchValue(service);
  }

  cancelarFormulario() {
    this.exibirFormulario = false;
    this.editandoId = null;
    this.mensagemDeErro = '';
  }

  salvarServico() {
    if (this.servicoForm.valid) {
      this.salvando = true;
      this.mensagemDeErro = '';
      const servico: Servico = this.servicoForm.value;

      const operation = this.estaEditando && this.editandoId
        ? this.servicoService.alterar(this.editandoId, servico)
        : this.servicoService.criar(servico);

      operation.subscribe({
        next: () => {
          this.salvando = false;
          this.cancelarFormulario();
          this.carregarServicos();
        },
        error: (error) => {
          this.salvando = false;
          this.mensagemDeErro = error.message || 'Erro ao salvar serviço';
        }
      });
    }
  }

  deletarServico(id: number) {
    if (confirm('Tem certeza que deseja desativar este serviço?')) {
      this.servicoService.excluir(id).subscribe({
        next: () => {
          this.carregarServicos();
        },
        error: (error) => {
          this.mensagemDeErro = error.message || 'Erro ao excluir serviço';
        }
      });
    }
  }
}
