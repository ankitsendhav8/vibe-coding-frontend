import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService, AppUser } from '../../services/auth.service';

type SortOption = 'newest' | 'oldest' | 'az' | 'za';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent implements OnInit {
  allUsers = signal<AppUser[]>([]);
  loading = signal(true);
  error = signal('');

  searchQuery = signal('');
  sortBy = signal<SortOption>('newest');

  readonly sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'az',     label: 'Name A → Z'  },
    { value: 'za',     label: 'Name Z → A'  },
  ];

  filteredUsers = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    let list = [...this.allUsers()];

    if (q) {
      list = list.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    }

    switch (this.sortBy()) {
      case 'newest': list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); break;
      case 'oldest': list.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()); break;
      case 'az':     list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'za':     list.sort((a, b) => b.name.localeCompare(a.name)); break;
    }

    return list;
  });

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getActiveUsers().subscribe({
      next: (res) => {
        this.allUsers.set(res.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Failed to load members.');
        this.loading.set(false);
      }
    });
  }

  onSearch(value: string) {
    this.searchQuery.set(value);
  }

  onSort(value: string) {
    this.sortBy.set(value as SortOption);
  }

  clearSearch() {
    this.searchQuery.set('');
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  }

  getAvatarColor(id: number): string {
    const colors = [
      '#6366f1', '#8b5cf6', '#ec4899', '#14b8a6',
      '#f59e0b', '#22c55e', '#3b82f6', '#ef4444', '#f97316'
    ];
    return colors[id % colors.length];
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  }

  getDaysSince(dateStr: string): number {
    return Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
  }

  isCurrentUser(userId: number): boolean {
    return this.authService.currentUser?.id === userId;
  }

  get newestMember(): AppUser | null {
    const users = this.allUsers();
    if (!users.length) return null;
    return [...users].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
  }
}
