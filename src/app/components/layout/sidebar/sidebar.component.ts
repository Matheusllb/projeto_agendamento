import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LayoutDashboard, Calendar, UserCircle, Handshake, Users, Package, Settings } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  template: `
    <div class="h-16 flex items-center px-6 border-b border-gray-200">
      <h2 class="text-xl font-bold text-primary m-0">Agenda +</h2>
    </div>
    <nav class="py-4">
      <ul class="space-y-1">
        <li>
          <a routerLink="/dashboard" routerLinkActive="bg-primary-light text-primary border-primary" 
             class="flex items-center px-6 py-3 text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors border-l-4 border-transparent">
            <lucide-icon [img]="Dashboard" class="mr-3 w-5 h-5"></lucide-icon> Dashboard
          </a>
        </li>
        <li>
          <a routerLink="/agendamentos" routerLinkActive="bg-primary-light text-primary border-primary"
             class="flex items-center px-6 py-3 text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors border-l-4 border-transparent">
            <lucide-icon [img]="Agendamentos" class="mr-3 w-5 h-5"></lucide-icon> Agendamentos
          </a>
        </li>
        <li>
          <a routerLink="/profissionais" routerLinkActive="bg-primary-light text-primary border-primary"
             class="flex items-center px-6 py-3 text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors border-l-4 border-transparent">
            <lucide-icon [img]="Profissionais" class="mr-3 w-5 h-5"></lucide-icon> Profissionais
          </a>
        </li>
        <li>
          <a routerLink="/servicos" routerLinkActive="bg-primary-light text-primary border-primary"
             class="flex items-center px-6 py-3 text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors border-l-4 border-transparent">
            <lucide-icon [img]="Servicos" class="mr-3 w-5 h-5"></lucide-icon> Serviços
          </a>
        </li>
        <li>
          <a routerLink="/clientes" routerLinkActive="bg-primary-light text-primary border-primary"
             class="flex items-center px-6 py-3 text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors border-l-4 border-transparent">
            <lucide-icon [img]="Clientes" class="mr-3 w-5 h-5"></lucide-icon> Clientes
          </a>
        </li>
        <li>
          <a routerLink="/produtos" routerLinkActive="bg-primary-light text-primary border-primary"
             class="flex items-center px-6 py-3 text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors border-l-4 border-transparent">
            <lucide-icon [img]="Estoque" class="mr-3 w-5 h-5"></lucide-icon> Estoque
          </a>
        </li>
        <li>
          <a routerLink="/settings" routerLinkActive="bg-primary-light text-primary border-primary"
             class="flex items-center px-6 py-3 text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors border-l-4 border-transparent">
            <lucide-icon [img]="Configuracoes" class="mr-3 w-5 h-5"></lucide-icon> Configurações
          </a>
        </li>
      </ul>
    </nav>
  `
})
export class SidebarComponent {
  readonly Dashboard = LayoutDashboard;
  readonly Agendamentos = Calendar;
  readonly Profissionais = UserCircle;
  readonly Servicos = Handshake;
  readonly Clientes = Users;
  readonly Estoque = Package;
  readonly Configuracoes = Settings;
}
