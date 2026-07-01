import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-roadmap-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './roadmap-card.html'
})
export class RoadmapCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) description!: string;
}
