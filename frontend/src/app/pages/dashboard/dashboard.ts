import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { AiChatComponent } from '../../components/ai-chat/ai-chat';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent,
    SidebarComponent,
    AiChatComponent
  ],
  templateUrl: './dashboard.html'
})
export default class DashboardComponent {
  authService = inject(AuthService);
  private router = inject(Router);
  userProfile = this.authService.userProfile;

  // Modals state
  isAddDocModalOpen = signal<boolean>(false);

  // Add Doc form states
  newDocName = '';
  newDocStatus = 'Verified';
  newDocDate = '';
  newDocColor = 'blue';
  newDocIcon = 'description';

  // State Signals
  priorityActions = signal([
    { id: 1, title: 'Passport expires in 5 months', detail: 'Valid till 12 Jan 2026', type: 'renew', buttonText: 'Renew Now', color: 'rose' },
    { id: 2, title: 'Vehicle Insurance expires in 18 days', detail: 'Policy no. MAG123456', type: 'view', buttonText: 'View Details', color: 'amber' },
    { id: 3, title: 'Complete your profile (75%)', detail: 'Add your financial information', type: 'continue', buttonText: 'Continue', color: 'emerald' }
  ]);

  financialSnapshot = signal([
    { title: 'Monthly Income', amount: '₹1,25,000', detail: 'After tax', color: 'emerald', icon: 'account_balance_wallet' },
    { title: 'Investments', amount: '₹8,45,000', detail: 'Total value', color: 'indigo', icon: 'trending_up' },
    { title: 'Insurance Coverage', amount: '₹15,00,000', detail: 'Total cover', color: 'blue', icon: 'shield' },
    { title: 'Credit Score', amount: '782', detail: 'Good', color: 'orange', icon: 'speed' }
  ]);

  documents = signal([
    { name: 'PAN Card', status: 'Verified', date: 'Valid', color: 'blue', icon: 'credit_card' },
    { name: 'Passport', status: 'Expires in 5 months', date: '12 Jan 2026', color: 'orange', icon: 'flight_takeoff' },
    { name: 'Driving Licence', status: 'Valid till', date: '23 Aug 2028', color: 'emerald', icon: 'badge' },
    { name: 'Vehicle RC', status: 'Valid till', date: '14 Nov 2027', color: 'purple', icon: 'directions_car' },
    { name: 'Health Insurance', status: 'Expires in 18 days', date: '25 Jun 2025', color: 'rose', icon: 'favorite' }
  ]);

  upcomingReminders = signal([
    { title: 'Tax Filing (FY 2024-25)', due: 'Due on 31 Jul 2025', remaining: '45 days', color: 'purple', icon: 'receipt_long' },
    { title: 'Passport Renewal', due: 'Expires on 12 Jan 2026', remaining: '5 months', color: 'blue', icon: 'badge' },
    { title: 'Credit Card Due', due: 'HDFC **** 1234', remaining: '12 days', color: 'rose', icon: 'credit_card' },
    { title: 'Vehicle Insurance', due: 'Policy expires on 25 Jun 2025', remaining: '18 days', color: 'emerald', icon: 'security' }
  ]);

  // Handlers
  async onLogout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  onRemoveDoc(index: number): void {
    this.documents.update(prev => prev.filter((_, i) => i !== index));
  }

  onAddDocSubmit(): void {
    if (!this.newDocName.trim()) return;

    const newDoc = {
      name: this.newDocName,
      status: this.newDocStatus,
      date: this.newDocDate || 'No Expiry',
      color: this.newDocColor,
      icon: this.newDocIcon
    };

    this.documents.update(prev => [...prev, newDoc]);
    this.isAddDocModalOpen.set(false);

    // Reset Form
    this.newDocName = '';
    this.newDocStatus = 'Verified';
    this.newDocDate = '';
    this.newDocColor = 'blue';
    this.newDocIcon = 'description';
  }
}
