import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'shared/components/header/header.component';

import { ThemeService } from './core/services/theme.service';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, MatCheckboxModule, HeaderComponent],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title!: 'blabla';
  constructor(private themeService: ThemeService) {}

  toggleTheme(theme: string) {
    switch (theme) {
      case 'dark':
        this.themeService.enableDarkTheme();
        break;
      case 'custom':
        this.themeService.enableCustomTheme();
        break;
      default:
        this.themeService.enableLightTheme();

        break;
    }
  }
}
