import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Menu, LogOut, UserCircle } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div class="flex items-center gap-4">
        <button class="md:hidden p-1 rounded hover:bg-gray-100 text-text-secondary">
          <lucide-icon [img]="Menu"></lucide-icon>
        </button>
        <div class="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          <span class="w-2 h-2 bg-green-800 rounded-full mr-2"></span> ABERTO - Fecha às 19:00
        </div>
      </div>
      
      <div class="flex items-center gap-2">
        <span class="font-medium text-gray-700">Admin</span>
        <div class="w-8 h-8 bg-primary-light text-primary rounded-full flex items-center justify-center">
          <lucide-icon [img]="UserCircle" size="20"></lucide-icon>
        </div>
        <button class="p-1 rounded hover:bg-gray-100 text-text-secondary hover:text-primary transition-colors" title="Sair">
          <lucide-icon [img]="LogOut" size="20"></lucide-icon>
        </button>
      </div>
    </header>
  `
})
export class HeaderComponent {
  readonly Menu = Menu;
  readonly LogOut = LogOut;
  readonly UserCircle = UserCircle;
}
