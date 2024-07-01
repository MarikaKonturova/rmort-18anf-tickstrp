import { Routes } from '@angular/router';

import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

export const mainRoutes: Routes = [
  {
    component: BasketComponent,
    path: 'basket',
  },
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: ProfileComponent,
    path: 'profile',
  },
];
