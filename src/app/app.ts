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
