import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, Settings as SettingsIcon, Save } from 'lucide-angular';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  template: `
    <div class="page-header">
      <h2>Configurações</h2>
    </div>

    <div class="max-w-4xl mx-auto">
      <div class="card">
        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <lucide-icon [img]="SettingsIcon" size="24" class="text-primary"></lucide-icon>
          <h3 class="text-xl font-bold text-gray-800">Configurações do Estabelecimento</h3>
        </div>

        <div class="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-6">
          <p class="text-sm">
            <strong>Nota:</strong> As configurações do estabelecimento serão implementadas em breve. 
            Por enquanto, você pode gerenciar profissionais, serviços e clientes.
          </p>
        </div>

        <form [formGroup]="configForm" (ngSubmit)="salvarConfiguracoes()" class="space-y-6">
          <!-- Informações Básicas -->
          <div>
            <h4 class="font-semibold text-gray-700 mb-4">Informações Básicas</h4>
            <div class="space-y-4">
              <div>
                <label class="block mb-1 font-medium text-gray-600">Nome do Estabelecimento</label>
                <input type="text" formControlName="nome" class="form-control" placeholder="Ex: Barbearia Exemplo">
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block mb-1 font-medium text-gray-600">Telefone</label>
                  <input type="text" formControlName="telefone" class="form-control" placeholder="(11) 99999-9999">
                </div>
                <div>
                  <label class="block mb-1 font-medium text-gray-600">Email</label>
                  <input type="email" formControlName="email" class="form-control" placeholder="contato@exemplo.com">
                </div>
              </div>
              <div>
                <label class="block mb-1 font-medium text-gray-600">Endereço</label>
                <input type="text" formControlName="endereco" class="form-control" placeholder="Rua, número, bairro">
              </div>
            </div>
          </div>

          <!-- Horário de Funcionamento -->
          <div class="pt-6 border-t border-gray-200">
            <h4 class="font-semibold text-gray-700 mb-4">Horário de Funcionamento</h4>
            <div class="text-sm text-gray-500 mb-4">
              Configure os horários de funcionamento do estabelecimento para cada dia da semana.
            </div>
          </div>

          <!-- Intervalo entre Atendimentos -->
          <div class="pt-6 border-t border-gray-200">
            <h4 class="font-semibold text-gray-700 mb-4">Agendamentos</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 font-medium text-gray-600">Intervalo entre Atendimentos (min)</label>
                <input type="number" formControlName="intervaloAtendimentos" class="form-control" min="0" step="5">
              </div>
              <div>
                <label class="block mb-1 font-medium text-gray-600">Limite de Dias Futuros</label>
                <input type="number" formControlName="limiteDiasFuturos" class="form-control" min="1">
              </div>
            </div>
          </div>

          <!-- Butões -->
          <div class="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button type="button" class="btn btn-secondary" (click)="resetarFormulario()">Cancelar</button>
            <button type="submit" class="btn btn-primary" [disabled]="configForm.invalid || salvando">
              <lucide-icon [img]="Save" size="18" class="mr-2"></lucide-icon>
              {{ salvando ? 'Salvando...' : 'Salvar Configurações' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ConfiguracoesComponet implements OnInit {
  private fb = inject(FormBuilder);

  readonly SettingsIcon = SettingsIcon;
  readonly Save = Save;

  salvando = false;
  configForm: FormGroup;

  constructor() {
    this.configForm = this.fb.group({
      nome: ['Barbearia Exemplo', Validators.required],
      endereco: ['Rua das Flores, 123'],
      telefone: ['(11) 99999-9999', Validators.required],
      email: ['contato@exemplo.com', [Validators.email]],
      intervaloAtendimentos: [15, [Validators.required, Validators.min(0)]],
      limiteDiasFuturos: [30, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    // As configurações serão carregadas da API ao iniciar a aplicação em implementação futura
  }

  salvarConfiguracoes() {
    if (this.configForm.valid) {
      this.salvando = true;
      // Simulação de salvamento
      setTimeout(() => {
        this.salvando = false;
        alert('Configurações salvas com sucesso! (Funcionalidade em desenvolvimento)');
      }, 1000);
    }
  }

  resetarFormulario() {
    this.configForm.reset({
      nome: 'Barbearia Exemplo',
      endereco: 'Rua das Flores, 123',
      telefone: '(11) 99999-9999',
      email: 'contato@exemplo.com',
      intervaloAtendimentos: 15,
      limiteDiasFuturos: 30
    });
  }
}
