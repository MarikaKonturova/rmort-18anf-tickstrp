import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from 'core/services/auth.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { LocalStorageService } from './core/services/local-storage.service';

const EXCLUDED_URLS = ['api/login', 'api/refresh', 'api/register'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const authService = inject(AuthService);
  const token = localStorageService.getItem('token') ?? '';

  const authReq = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
    withCredentials: true,
  });

  return next(authReq).pipe(
    catchError(error => {
      if (shouldAttemptRefresh(error, req.url)) {
        return handleTokenRefresh(req, next, authService, localStorageService);
      }
      return throwError(() => error);
    })
  );
};

function shouldAttemptRefresh(error: unknown, url: string): boolean {
  return (
    error instanceof HttpErrorResponse &&
    !EXCLUDED_URLS.some(excludedUrl => url.includes(excludedUrl)) &&
    error.status === 401
  );
}

function handleTokenRefresh(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  localStorageService: LocalStorageService
) {
  return authService.refreshToken().pipe(
    tap(res => localStorageService.setItem('token', res.accessToken)),
    switchMap(res => {
      const refreshedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${res.accessToken}`,
        },
        withCredentials: true,
      });
      return next(refreshedReq);
    }),
    catchError(err => {
      localStorageService.removeItem('token');
      authService.logout();
      return throwError(() => new Error(err));
    })
  );
}
