import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgendamentoService } from '../../services/agendamento.service';
import { Agendamento } from '../../models/agendamento.model';
import { LucideAngularModule, Plus, Trash2, Edit, Search, History } from 'lucide-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-agendamentos',
    imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
    template: `
        <div class="page-header">
        <h2>Agendamentos</h2>
        <!-- Botão de Adicionar -->
        <button class="btn btn-primary" (click)="abrirFormulario()">
            <lucide-icon [img]="Adicionar" class="w-4 h-4 mr-2"></lucide-icon>
            Adicionar Agendamento
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
    `
})

export class AgendamentosComponent {
    private fb = inject(FormBuilder);
    private agendamentoService = inject(AgendamentoService);

    readonly Adicionar = Plus;
    readonly Remover = Trash2;
    readonly Editar = Edit;
    readonly Buscar = Search;
    readonly Historico = History;

    agendamentos$!: Observable<readonly Agendamento[]>;
    carregando$ = new BehaviorSubject<boolean>(false);

    exibirFormulario = false;
    estaEditando = false;
    editandoId: number | null = null;
    mensagemDeErro = '';
    salvando = false;

    agendamentoForm: FormGroup;

    constructor() {
        this.agendamentoForm = this.fb.group({
            nome: ['', Validators.required],
            telefone: ['', Validators.required],
            email: ['', [Validators.email]],
            observacoes: ['']
        });
    }

    abrirFormulario() {
        this.exibirFormulario = true;
        this.estaEditando = false;
        this.agendamentoForm.reset();
    }

    editarAgendamento(agendamento: Agendamento) {
        this.exibirFormulario = true;
        this.estaEditando = true;
        this.editandoId = agendamento.idAgendamento!;
        this.agendamentoForm.patchValue(agendamento);
    }

    cancelarFormulario() {
        this.exibirFormulario = false;
        this.estaEditando = false;
        this.editandoId = null;
        this.agendamentoForm.reset();
    }

    salvarAgendamento() {
        if (this.agendamentoForm.valid) {
            this.salvando = true;
            this.mensagemDeErro = '';
            const agendamento: Agendamento = this.agendamentoForm.value;

            const operation = this.estaEditando && this.editandoId
                ? this.agendamentoService.alterar(this.editandoId, agendamento)
                : this.agendamentoService.criar(agendamento);

            operation.pipe(
                finalize(() => {
                    this.salvando = false;
                })
            ).subscribe({
                next: () => {
                    this.cancelarFormulario();
                },
                error: (error) => {
                    this.mensagemDeErro = error.message;
                }
            });
        }
    }

    deletarAgendamento(idAgendamento: number) {
        this.agendamentoService.excluir(idAgendamento).subscribe({
            next: () => {
                this.agendamentos$ = this.agendamentoService.buscarTodos();
            },
            error: (error) => {
                this.mensagemDeErro = error.message;
            }
        });
    }


}

