/**
 * Este arquivo define as rotas da aplicação.
 * Ele mapeia URLs (caminhos) para componentes específicos, permitindo a navegação entre páginas.
 */
import { Routes } from '@angular/router';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConfiguracoesComponet } from './pages/configuracoes/settings.component';
import { ProfissionaisComponent } from './pages/profissionais/profissionais.component';
import { ServicosComponent } from './pages/servicos/servicos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'configuracoes', component: ConfiguracoesComponet },
    { path: 'profissionais', component: ProfissionaisComponent },
    { path: 'servicos', component: ServicosComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'produtos', component: ProdutosComponent },
    { path: 'agendamentos', component: AgendamentosComponent }
];
