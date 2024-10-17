import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    loadComponent: () => import('./pages/content/content.component').then( m => m.ContentComponent),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
];
