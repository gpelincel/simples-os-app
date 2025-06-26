import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'clientes',
    loadComponent: () => import('./pages/clientes/clientes.page').then( m => m.ClientesPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'ordem-servico',
    loadComponent: () => import('./pages/ordem-servico/ordem-servico.page').then( m => m.OrdemServicoPage)
  },
  {
    path: 'equipamentos',
    loadComponent: () => import('./pages/equipamentos/equipamentos.page').then( m => m.EquipamentosPage)
  },
  {
    path: 'equipamentos/cadastro',
    loadComponent: () => import('./pages/cadastro-equipamentos/cadastro-equipamentos.page').then( m => m.CadastroEquipamentosPage)
  },
  {
    path: 'clientes/cadastro',
    loadComponent: () => import('./pages/cadastro-clientes/cadastro-clientes.page').then( m => m.CadastroClientesPage)
  },
  {
    path: 'ordem-servico/cadastro',
    loadComponent: () => import('./pages/cadastro-os/cadastro-os.page').then( m => m.CadastroOsPage)
  },
];
