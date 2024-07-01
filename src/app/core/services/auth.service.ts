import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  private http = inject(HttpClient);
  private router = inject(Router);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);
  login(user: { email: string; password: string }) {
    return this.http.post<{
      accessToken: string;
      refreshToken: string;
      user: UserInterface;
    }>(`${this.apiUrl}/login`, {
      email: user.email,
      password: user.password,
    });
  }
  logout() {
    this.currentUserSig.set(null);
    this.router.navigate(['/login']);
  }
  me() {
    return this.http.get(`http://localhost:5000/api/me`);
  }
  refreshToken() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.get<any>(`http://localhost:5000/api/refresh`);
  }
  register(user: { email: string; password: string; username: string }) {
    return this.http.post<{
      accessToken: string;
      refreshToken: string;
      user: UserInterface;
    }>(`${this.apiUrl}/registration`, user);
  }
}
