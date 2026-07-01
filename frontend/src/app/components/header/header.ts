import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './header.html'
})
export class HeaderComponent {
  @Input({ required: true }) email!: string;
  @Input() firstName: string | null = null;
  @Output() logout = new EventEmitter<void>();
}
