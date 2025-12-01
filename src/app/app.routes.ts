/**
 * Este arquivo define as rotas da aplicação.
 * Ele mapeia URLs (caminhos) para componentes específicos, permitindo a navegação entre páginas.
 */
import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProfissionaisComponent } from './pages/profissionais/profissionais.component';
import { ServicosComponent } from './pages/servicos/servicos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'profissionais', component: ProfissionaisComponent },
    { path: 'servicos', component: ServicosComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'produtos', component: ProdutosComponent },
];
