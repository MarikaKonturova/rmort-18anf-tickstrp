import { Routes } from '@angular/router';
import { authGuard } from 'core/guards/auth.guard';

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  {
    canActivate: [authGuard],

    canLoad: [authGuard],
    loadChildren: () =>
      import('./components/main/main.routes').then(main => main.mainRoutes),
    path: 'main',
  },
  {
    component: RegisterComponent,
    path: 'register',
  },
  {
    component: LoginComponent,
    path: 'login',
  },
];
