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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  selector: 'app-register',
  standalone: true,
  styleUrl: './register.component.scss',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private ls = inject(LocalStorageService);
  private router = inject(Router);

  // add phone number here w/ ControlValueAccessor
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    username: ['', Validators.required],
  });

  onSubmit(): void {
    console.log(this.form.getRawValue());
    this.authService.register(this.form.getRawValue()).subscribe({
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
      next: response => {
        this.ls.setItem('token', response.accessToken);
        this.authService.currentUserSig.set(response.user);
        this.router.navigateByUrl('/');
      },
    });
  }
}
