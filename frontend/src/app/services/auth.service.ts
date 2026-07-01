import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseSdkUser } from 'firebase/auth';
import { environment } from '../../environments/environment';
import { API_CONFIG } from '../core/api.config';
import { UserProfile } from '../models/user.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  
  private firebaseApp = initializeApp(environment.firebase);
  private firebaseAuth = getAuth(this.firebaseApp);

  private _fbUser = signal<FirebaseSdkUser | null>(null);
  private _userProfile = signal<UserProfile | null>(null);
  private _loading = signal<boolean>(true);

  readonly fbUser = this._fbUser.asReadonly();
  readonly userProfile = this._userProfile.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isAuthenticated = computed(() => this._fbUser() !== null);

  constructor() {
    onAuthStateChanged(this.firebaseAuth, async (user) => {
      this._loading.set(true);
      if (user) {
        this._fbUser.set(user);
        try {
          const profile = await this.syncProfileWithBackend();
          this._userProfile.set(profile);
        } catch (error) {
          console.error("Backend user sync failed, applying local mock data...", error);
          if (!environment.production) {
            this._userProfile.set({
              id: 999,
              firebase_uid: user.uid,
              email: user.email || 'developer@lifecopilot.dev',
              first_name: 'Local Dev',
              last_name: 'Admin',
              is_active: true
            });
          }
        }
      } else {
        this._fbUser.set(null);
        this._userProfile.set(null);
      }
      this._loading.set(false);
    });
  }

  async getIdToken(): Promise<string | null> {
    const user = this.firebaseAuth.currentUser;
    if (!user) {
      return !environment.production ? 'dev_token_bypass' : null;
    }
    return user.getIdToken();
  }

  async login(email: string, password: string): Promise<void> {
    this._loading.set(true);
    try {
      await signInWithEmailAndPassword(this.firebaseAuth, email, password);
    } finally {
      this._loading.set(false);
    }
  }

  async register(email: string, password: string): Promise<void> {
    this._loading.set(true);
    try {
      await createUserWithEmailAndPassword(this.firebaseAuth, email, password);
    } finally {
      this._loading.set(false);
    }
  }

  async logout(): Promise<void> {
    this._loading.set(true);
    try {
      await signOut(this.firebaseAuth);
    } finally {
      this._loading.set(false);
    }
  }

  updateProfileSignal(profile: UserProfile): void {
    this._userProfile.set(profile);
  }

  private async syncProfileWithBackend(): Promise<UserProfile> {
    return firstValueFrom(
      this.http.post<UserProfile>(API_CONFIG.endpoints.users.me, {})
    );
  }
}
