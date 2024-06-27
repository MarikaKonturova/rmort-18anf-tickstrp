import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RMORTY_API_URL } from 'core/tokens/rmorty-api.token';

import { ThemeService } from './core/services/theme.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatDividerModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatFormFieldModule,
    RouterLink,
    MatInputModule,
    MatCardModule,
  ],
  providers: [
    { provide: RMORTY_API_URL, useValue: 'https://rickandmortyapi.com/api' },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
