import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService, AppUser } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: AppUser | null = null;
  loading = true;

  constructor(
    private authService: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.authService.getMe().subscribe({
      next: (res) => {
        this.user = res.data;
        this.loading = false;
      },
      error: () => {
        // Fall back to cached user if API fails
        this.user = this.authService.currentUser;
        this.loading = false;
        this.toast.error('Could not refresh profile. Showing cached data.');
      }
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  getDaysSince(dateStr: string): number {
    const joined = new Date(dateStr).getTime();
    const now = Date.now();
    return Math.floor((now - joined) / (1000 * 60 * 60 * 24));
  }

  copyEmail() {
    if (!this.user) return;
    navigator.clipboard.writeText(this.user.email).then(() => {
      this.toast.success('Email copied to clipboard!');
    });
  }

  logout() {
    this.authService.logout();
  }
}
