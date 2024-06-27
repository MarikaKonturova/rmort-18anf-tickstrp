import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

// TODO: rewrite on Friday
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private lightThemeClass = 'light-theme';
  private darkThemeClass = 'dark-theme';
  private customThemeClass = 'custom-theme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  enableLightTheme() {
    this.renderer.addClass(document.body, this.lightThemeClass);
    this.renderer.removeClass(document.body, this.customThemeClass);
    this.renderer.removeClass(document.body, this.darkThemeClass);
  }
  enableDarkTheme() {
    this.renderer.addClass(document.body, this.darkThemeClass);
    this.renderer.removeClass(document.body, this.customThemeClass);
    this.renderer.removeClass(document.body, this.lightThemeClass);
  }

  enableCustomTheme() {
    this.renderer.addClass(document.body, this.customThemeClass);
    this.renderer.removeClass(document.body, this.darkThemeClass);
    this.renderer.removeClass(document.body, this.lightThemeClass);
  }
}
