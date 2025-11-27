/**
 * Este é o componente raiz (Root Component) da aplicação.
 * Ele serve como o container principal para toda a interface do usuário.
 * Neste caso, ele delega a renderização para o MainLayoutComponent.
 */
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from "./components/layout/main-layout/main-layout.component";


@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent],
  template: `
    <app-main-layout></app-main-layout>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projeto-agendamento');
}
