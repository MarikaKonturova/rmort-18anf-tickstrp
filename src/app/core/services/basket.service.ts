import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Tiket } from 'components/main/models/tiket.model';
import { Basket } from 'core/models/basket.interface';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private apiUrl = 'http://localhost:5000/api';
  private http = inject(HttpClient);

  mockState: Tiket[] = [];

  addToBasket(characterId: number) {
    return this.http.post<Basket>(`${this.apiUrl}/basket`, { characterId });
  }
  getBasket() {
    return this.http.get<Basket[]>(`${this.apiUrl}/basket`);
  }
  removeFromBasket(characterId: number) {
    return this.http.put<Basket>(`${this.apiUrl}/basket`, { characterId });
  }
}
