import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Tiket } from 'components/main/models/tiket.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private apiUrl = 'http://localhost:5000/api';
  private http = inject(HttpClient);

  mockState: Tiket[] = [];

  addToBasket(characterId: number) {
    return this.http.post(`${this.apiUrl}/basket`, { characterId });
  }
  removeFromBasket(characterId: number) {
    return this.http.put(`${this.apiUrl}/basket`, { characterId });
  }
}
