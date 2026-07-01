import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../services/auth.service';
import { LogoComponent } from '../../../components/logo/logo';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    LogoComponent
  ],
  templateUrl: './login.html'
})
export default class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  hidePassword = signal<boolean>(true);
  errorMessage = signal<string | null>(null);
  loading = this.authService.loading;
  
  // UI Tabs State
  activeTab = signal<'email' | 'phone'>('email');
  
  // Mock dropdown open state
  langMenuOpen = signal<boolean>(false);
  activeLang = signal<string>('English');

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) return;

    this.errorMessage.set(null);
    const { email, password } = this.loginForm.getRawValue();

    try {
      await this.authService.login(email, password);
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('Login error:', error);
      this.errorMessage.set(
        error.message || 'Invalid email or password. Please try again.'
      );
    }
  }

  onMockBypass(): void {
    localStorage.setItem('dev_bypass', 'true');
    this.router.navigate(['/dashboard']);
  }
}
