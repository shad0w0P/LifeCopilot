import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './ai-chat.html'
})
export class AiChatComponent {
  // Drawer open state
  isOpen = signal<boolean>(false);

  // Form input and response states
  chatInput = '';
  chatMessages = signal<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: 'Hi Atul! I am your AI Assistant. Ask me anything about your documents, finance, taxes, or benefits.' }
  ]);
  aiTyping = signal<boolean>(false);

  toggleOpen(): void {
    this.isOpen.update(val => !val);
  }

  onAsk(question: string): void {
    if (!question.trim()) return;

    // Add user message
    this.chatMessages.update(prev => [...prev, { sender: 'user', text: question }]);
    this.chatInput = '';
    this.aiTyping.set(true);

    // Simulate AI response
    setTimeout(() => {
      let reply = 'I can help you review that. Currently, I see you have 5 documents and 3 actions requiring your attention.';
      const lowercaseQ = question.toLowerCase();

      if (lowercaseQ.includes('tax') || lowercaseQ.includes('save')) {
        reply = 'For FY 2024-25, your Tax Filing is due on 31 Jul 2025 (45 days remaining). You can save more tax by completing your investment declarations.';
      } else if (lowercaseQ.includes('should i do') || lowercaseQ.includes('month')) {
        reply = 'Your top priority tasks for this month are:\n1. Renew your Vehicle Insurance (expires in 18 days).\n2. Review your Passport details (expires in 5 months).';
      } else if (lowercaseQ.includes('scheme') || lowercaseQ.includes('eligible')) {
        reply = 'Based on your profile, you are eligible to view central tax saving savings schemes and senior/family insurance discounts.';
      }

      this.chatMessages.update(prev => [...prev, { sender: 'ai', text: reply }]);
      this.aiTyping.set(false);
    }, 1000);
  }
}
