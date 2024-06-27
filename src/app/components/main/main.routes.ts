import { Routes } from '@angular/router';

import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';

export const mainRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'basket',
    component: BasketComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];
