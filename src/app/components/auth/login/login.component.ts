import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
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
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private ls = inject(LocalStorageService);
  private cdr = inject(ChangeDetectorRef);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    this.authService.login(this.form.getRawValue()).subscribe({
      next: response => {
        this.ls.setItem('token', response.user.token);
        this.authService.currentUserSig.set(response.user);
        this.router.navigateByUrl('/');
      },
      error: error => {
        console.log(error);
        if (error.error?.errors) {
          const errorObj = error.error.errors;
          Object.keys(errorObj).forEach(field => {
            const control = this.form.get(field);
            if (control) {
              control.setErrors({
                serverError: errorObj[field][0],
              });
            }
          });
          this.cdr.markForCheck();
        }
      },
    });
  }
}
