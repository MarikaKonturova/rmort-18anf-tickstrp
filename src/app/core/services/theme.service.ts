import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private readonly themes = {
    custom: 'custom-theme',
    dark: 'dark-theme',
    light: 'light-theme',
  };

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private applyTheme(theme: string) {
    Object.values(this.themes).forEach(themeClass => {
      if (themeClass === theme) {
        this.renderer.addClass(document.body, themeClass);
      } else {
        this.renderer.removeClass(document.body, themeClass);
      }
    });
  }

  enableCustomTheme() {
    this.applyTheme(this.themes.custom);
  }

  enableDarkTheme() {
    this.applyTheme(this.themes.dark);
  }

  enableLightTheme() {
    this.applyTheme(this.themes.light);
  }
}
