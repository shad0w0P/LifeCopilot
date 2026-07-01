import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header';
import { RoadmapCardComponent } from '../../components/roadmap-card/roadmap-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent,
    RoadmapCardComponent
  ],
  templateUrl: './dashboard.html'
})
export default class DashboardComponent {
  authService = inject(AuthService);
  userProfile = this.authService.userProfile;

  async onLogout(): Promise<void> {
    await this.authService.logout();
  }
}
