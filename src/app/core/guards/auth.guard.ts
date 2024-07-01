import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from 'core/services/local-storage.service';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const ls = inject(LocalStorageService);
  const router = inject(Router);

  if (authService.currentUserSig() || ls.getItem('token')) {
    return true;
  }

  router.navigate(['/login']);

  return false;
};
