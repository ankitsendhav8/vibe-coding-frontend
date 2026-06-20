import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoadingService } from './loading.service';
import { ToastService } from './toast.service';

export interface AppUser {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: { user: AppUser; token: string };
}

interface UsersResponse {
  success: boolean;
  count: number;
  data: AppUser[];
}

const TOKEN_KEY = 'vc_token';
const USER_KEY = 'vc_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  private _currentUser$ = new BehaviorSubject<AppUser | null>(this.loadUser());
  readonly currentUser$ = this._currentUser$.asObservable();

  get isLoggedIn(): boolean {
    return !!this._currentUser$.value;
  }

  get currentUser(): AppUser | null {
    return this._currentUser$.value;
  }

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private loading: LoadingService,
    private toast: ToastService
  ) {}

  signup(name: string, email: string, password: string): Observable<AuthResponse> {
    this.loading.show();
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, { name, email, password }).pipe(
      tap(res => this.handleAuth(res)),
      finalize(() => this.loading.hide())
    );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    this.loading.show();
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => this.handleAuth(res)),
      finalize(() => this.loading.hide())
    );
  }

  getMe(): Observable<{ success: boolean; data: AppUser }> {
    return this.http.get<{ success: boolean; data: AppUser }>(`${this.apiUrl}/me`).pipe(
      tap(res => {
        localStorage.setItem(USER_KEY, JSON.stringify(res.data));
        this._currentUser$.next(res.data);
      })
    );
  }

  getActiveUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.apiUrl}/users`);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._currentUser$.next(null);
    this.toast.info('You have been logged out.');
    this.router.navigate(['/']);
  }

  private handleAuth(res: AuthResponse) {
    const { user, token } = res.data;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this._currentUser$.next(user);
  }

  private loadUser(): AppUser | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
