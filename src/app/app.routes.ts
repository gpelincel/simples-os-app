import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/clientes',
    pathMatch: 'full',
  },
  {
    path: 'clientes',
    loadComponent: () => import('./pages/clientes/clientes.page').then( m => m.ClientesPage)
  },
];
