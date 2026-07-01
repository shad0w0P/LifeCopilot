import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { LayoutService } from '../../services/layout.service';
import { LogoComponent } from '../logo/logo';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, LogoComponent],
  templateUrl: './sidebar.html'
})
export class SidebarComponent {
  authService = inject(AuthService);
  layoutService = inject(LayoutService);

  userProfile = this.authService.userProfile;
  isCollapsed = this.layoutService.isSidebarCollapsed;
  isMobileOpen = this.layoutService.isMobileSidebarOpen;

  @Input() activeItem: 'dashboard' | 'profile' | 'none' = 'dashboard';
}
