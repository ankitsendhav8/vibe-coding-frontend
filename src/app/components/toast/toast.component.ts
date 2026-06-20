import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Toast, ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toasts; track toast.id) {
        <div class="toast" [class]="'toast--' + toast.type">
          <span class="toast-icon">
            @if (toast.type === 'success') { ✓ }
            @else if (toast.type === 'error') { ✕ }
            @else { ℹ }
          </span>
          <span class="toast-message">{{ toast.message }}</span>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 1.25rem;
      right: 1.25rem;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      pointer-events: none;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      padding: 0.85rem 1.25rem;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 500;
      color: #fff;
      min-width: 260px;
      max-width: 380px;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: all;
      border: 1px solid transparent;

      &--success {
        background: rgba(34, 197, 94, 0.15);
        border-color: rgba(34, 197, 94, 0.3);
        .toast-icon { color: #22c55e; }
      }

      &--error {
        background: rgba(239, 68, 68, 0.15);
        border-color: rgba(239, 68, 68, 0.3);
        .toast-icon { color: #ef4444; }
      }

      &--info {
        background: rgba(99, 102, 241, 0.15);
        border-color: rgba(99, 102, 241, 0.3);
        .toast-icon { color: #818cf8; }
      }
    }

    .toast-icon {
      font-size: 1rem;
      font-weight: 800;
      flex-shrink: 0;
    }

    .toast-message {
      line-height: 1.4;
    }

    @keyframes slideIn {
      from { transform: translateX(110%); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }

    @media (max-width: 480px) {
      .toast-container {
        top: auto;
        bottom: 1.25rem;
        left: 1rem;
        right: 1rem;
      }

      .toast {
        max-width: 100%;
      }
    }
  `]
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private sub!: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.sub = this.toastService.toasts$.subscribe(toast => {
      this.toasts.push(toast);
      setTimeout(() => {
        this.toasts = this.toasts.filter(t => t.id !== toast.id);
      }, 4000);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
