import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { LocalStorageService } from './core/services/local-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const ls = inject(LocalStorageService);
  const token = ls.getItem('token') ?? '';
  req = req.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : '',
    },
  });
  return next(req);
};
