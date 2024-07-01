import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  platf = inject(PLATFORM_ID);
  getItem(key: string): null | string {
    if (isPlatformBrowser(this.platf)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platf)) {
      localStorage.removeItem(key);
    }
  }

  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platf)) {
      localStorage.setItem(key, value);
    }
  }
}
