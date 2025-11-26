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
      <h2 class="text-xl font-bold text-primary m-0">BarberSys</h2>
    </div>
    <nav class="py-4">
      <ul class="space-y-1">
        <li>
          <a routerLink="/dashboard" routerLinkActive="bg-primary-light text-primary border-primary" 
             class="flex items-center px-6 py-3 text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors border-l-4 border-transparent">
            <lucide-icon [img]="LayoutDashboard" class="mr-3 w-5 h-5"></lucide-icon> Dashboard
          </a>
        </li>
        <li>
          <a routerLink="/appointments" routerLinkActive="bg-primary-light text-primary border-primary"
             class="flex items-center px-6 py-3 text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors border-l-4 border-transparent">
            <lucide-icon [img]="Calendar" class="mr-3 w-5 h-5"></lucide-icon> Agendamentos
          </a>
        </li>
        <li>
          <a routerLink="/professionals" routerLinkActive="bg-primary-light text-primary border-primary"
             class="flex items-center px-6 py-3 text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors border-l-4 border-transparent">
            <lucide-icon [img]="UserCircle" class="mr-3 w-5 h-5"></lucide-icon> Profissionais
          </a>
        </li>
        <li>
          <a routerLink="/services" routerLinkActive="bg-primary-light text-primary border-primary"
             class="flex items-center px-6 py-3 text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors border-l-4 border-transparent">
            <lucide-icon [img]="Handshake" class="mr-3 w-5 h-5"></lucide-icon> Serviços
          </a>
        </li>
        <li>
          <a routerLink="/clients" routerLinkActive="bg-primary-light text-primary border-primary"
             class="flex items-center px-6 py-3 text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors border-l-4 border-transparent">
            <lucide-icon [img]="Users" class="mr-3 w-5 h-5"></lucide-icon> Clientes
          </a>
        </li>
        <li>
          <a routerLink="/products" routerLinkActive="bg-primary-light text-primary border-primary"
             class="flex items-center px-6 py-3 text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors border-l-4 border-transparent">
            <lucide-icon [img]="Package" class="mr-3 w-5 h-5"></lucide-icon> Estoque
          </a>
        </li>
        <li>
          <a routerLink="/settings" routerLinkActive="bg-primary-light text-primary border-primary"
             class="flex items-center px-6 py-3 text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors border-l-4 border-transparent">
            <lucide-icon [img]="Settings" class="mr-3 w-5 h-5"></lucide-icon> Configurações
          </a>
        </li>
      </ul>
    </nav>
  `
})
export class SidebarComponent {
  readonly LayoutDashboard = LayoutDashboard;
  readonly Calendar = Calendar;
  readonly UserCircle = UserCircle;
  readonly Handshake = Handshake;
  readonly Users = Users;
  readonly Package = Package;
  readonly Settings = Settings;
}
