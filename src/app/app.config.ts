import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  PLATFORM_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { LocalStorageService } from 'core/services/local-storage.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

import { routes } from './app.routes';
import { authInterceptor } from './auth.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    {
      deps: [LocalStorageService, PLATFORM_ID, SsrCookieService],
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: initializeAppDynamicRouting,
    },
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()),
    provideClientHydration(),
    provideAnimationsAsync(),
  ],
};

export function initializeAppDynamicRouting(
  localStorageService: LocalStorageService,
  platformId: object,
  ck: SsrCookieService
): () => Promise<void> {
  return () =>
    new Promise(resolve => {
      console.log(isPlatformServer(platformId));
      if (isPlatformBrowser(platformId)) {
        ck.get('token');
        console.log('browser ' + ck.get('token'));
        resolve();
      } else {
        ck.get('token');
        console.log('server ' + localStorageService.getItem('token'));
        resolve();
      }
    });
}
