import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from 'core/services/local-storage.service';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const ls = inject(LocalStorageService);
  const platf = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platf)) {
    return false;
  }
  const router = inject(Router);

  if (authService.currentUserSig() || ls.getItem('token')) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
