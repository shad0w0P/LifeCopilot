import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../core/api.config';
import { firstValueFrom } from 'rxjs';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { HeaderComponent } from '../../components/header/header';
import { AiChatComponent } from '../../components/ai-chat/ai-chat';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HeaderComponent,
    SidebarComponent,
    AiChatComponent
  ],
  templateUrl: './profile.html'
})
export default class ProfileComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);

  async onLogout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  userProfile = this.authService.userProfile;
  saving = signal<boolean>(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  profileForm = this.fb.group({
    first_name: [this.userProfile()?.first_name || '', [Validators.maxLength(100)]],
    last_name: [this.userProfile()?.last_name || '', [Validators.maxLength(100)]],
  });

  constructor() {
    const currentProfile = this.userProfile();
    if (currentProfile) {
      this.profileForm.patchValue({
        first_name: currentProfile.first_name || '',
        last_name: currentProfile.last_name || '',
      });
    }
  }

  async onSubmit(): Promise<void> {
    if (this.profileForm.invalid) return;

    this.saving.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    const rawValues = this.profileForm.value;

    try {
      const updatedProfile = await firstValueFrom(
        this.http.put<UserProfile>(API_CONFIG.endpoints.users.me, {
          first_name: rawValues.first_name || null,
          last_name: rawValues.last_name || null,
        })
      );
      this.authService.updateProfileSignal(updatedProfile);
      this.successMessage.set('Profile successfully updated.');
    } catch (error: any) {
      console.error('Profile update failed:', error);
      this.errorMessage.set(
        error.error?.detail || error.message || 'Failed to update profile details.'
      );
    } finally {
      this.saving.set(false);
    }
  }
}
