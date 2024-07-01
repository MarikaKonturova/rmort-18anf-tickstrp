import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CharacterGetResponse } from 'components/main/models/character.model';
import { AppParams } from 'components/main/models/params.model';

@Injectable({
  providedIn: 'root',
})
export class RmortyService {
  private apiUrl = 'http://localhost:5000/api';
  private http = inject(HttpClient);

  getCharacters(newParams?: Partial<AppParams>) {
    const params: Partial<AppParams> = {};

    if (newParams) {
      Object.keys(newParams).map(pk => {
        const paramsKey = pk as keyof Partial<AppParams>;
        if (newParams[paramsKey]) {
          params[paramsKey] = newParams[paramsKey]!;
        }
      });
    }
    return this.http.get<CharacterGetResponse>(`${this.apiUrl}/character`, {
      params,
    });
  }
}
