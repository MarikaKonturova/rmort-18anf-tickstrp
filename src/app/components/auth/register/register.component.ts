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
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private ls = inject(LocalStorageService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  // add phone number here w/ ControlValueAccessor
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    this.authService.register(this.form.getRawValue()).subscribe({
      next: response => {
        this.ls.setItem('token', response.user.token);
        this.authService.currentUserSig.set(response.user);
        this.router.navigateByUrl('/');
      },
      error: error => {
        if (error.error?.errors) {
          const errorObj = error.error.errors;
          Object.keys(errorObj).forEach(field => {
            const control = this.form.get(field);
            if (control) {
              control.setErrors({
                serverError: errorObj[field][0],
              });
              control.markAsTouched();
            }
          });
          this.cdr.markForCheck();
        }
      },
    });
  }
}
