import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashborad/dashborad.component').then( m => m.DashboradComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashborad-home/dashborad-home.page').then( m => m.DashboradHomePage)
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
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
        path: 'registro',
        loadComponent: () => import('./pages/registro/registro.page').then( m => m.RegistroPage)
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
