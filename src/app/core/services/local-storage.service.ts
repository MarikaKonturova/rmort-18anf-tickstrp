import { Injectable, inject } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  cookieService = inject(SsrCookieService);
  getItem(key: string): null | string {
    return this.cookieService.get(key);
  }

  removeItem(key: string): void {
    this.cookieService.delete(key);
  }

  setItem(key: string, value: string): void {
    this.cookieService.set(key, value);
  }
}
