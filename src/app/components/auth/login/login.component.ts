import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from 'core/services/auth.service';
import { LocalStorageService } from 'core/services/local-storage.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  selector: 'app-login',

  standalone: true,
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private ls = inject(LocalStorageService);
  private router = inject(Router);
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  serverError = signal<string>('');

  onSubmit(): void {
    this.authService.login(this.form.getRawValue()).subscribe({
      error: error => {
        this.serverError.set(error.error.message);
        this.cdr.markForCheck();
      },
      next: response => {
        this.ls.setItem('token', response.accessToken);
        this.authService.currentUserSig.set(response.user);
        this.router.navigateByUrl('/');
      },
    });
  }
}
