import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  apiUrl = 'https://api.realworld.io/api/';

  currentUserSig = signal<UserInterface | undefined | null>(undefined);
  login(user: { email: string; password: string }) {
    return this.http.post<{ user: UserInterface }>(
      `${this.apiUrl}/users/login`,
      {
        user,
      }
    );
  }
  register(user: { email: string; password: string }) {
    return this.http.post<{ user: UserInterface }>(`${this.apiUrl}/users`, {
      user,
    });
  }
  me() {
    return this.http.get<{ user: UserInterface }>(`${this.apiUrl}/user`);
  }
}
