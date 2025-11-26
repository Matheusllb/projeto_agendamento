import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="card">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Dashboard</h2>
      <p class="text-gray-600">Bem-vindo ao Agenda +! Utilize o menu lateral para navegar.</p>
    </div>
  `
})
export class DashboardComponent { }
