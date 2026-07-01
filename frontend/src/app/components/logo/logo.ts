import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo.html'
})
export class LogoComponent {
  @Input() showText = true;
  @Input() showTagline = false;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'custom' = 'md';
  @Input() theme: 'dark' | 'light' | 'white' = 'dark';

  // Classes map based on size input
  sizeClasses = computed(() => {
    switch (this.size) {
      case 'sm': return { svg: 'w-6 h-6', text: 'text-base', tag: 'text-[9px]' };
      case 'lg': return { svg: 'w-16 h-16', text: 'text-3xl', tag: 'text-xs' };
      case 'xl': return { svg: 'w-24 h-24', text: 'text-5xl', tag: 'text-sm' };
      case 'custom': return { svg: 'w-full h-full', text: '', tag: '' };
      case 'md':
      default: return { svg: 'w-10 h-10', text: 'text-xl', tag: 'text-[10px]' };
    }
  });

  // Text color theme classes
  textClasses = computed(() => {
    if (this.theme === 'light' || this.theme === 'white') {
      return {
        brand: 'text-white',
        copilot: 'text-white',
        tag: 'text-slate-300'
      };
    }
    return {
      brand: 'text-[#0f172a]', // Very dark slate for 'Life'
      copilot: 'bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent',
      tag: 'text-slate-500'
    };
  });
}
