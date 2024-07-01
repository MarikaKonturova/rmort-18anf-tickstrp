import { Routes } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  {
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
