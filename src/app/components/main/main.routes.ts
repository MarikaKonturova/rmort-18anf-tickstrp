import { Routes } from '@angular/router';
import { authGuard } from 'core/guards/auth.guard';

import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';

export const mainRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    canActivate: [authGuard],
    canLoad: [authGuard],
    component: BasketComponent,
    path: 'basket',
  },
  {
    canActivate: [authGuard],
    canLoad: [authGuard],
    component: HomeComponent,
    path: 'home',
  },
];
