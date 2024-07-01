import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService } from 'core/services/basket.service';
import { RmortyService } from 'core/services/rmorty.service';
import { debounceTime, tap } from 'rxjs/operators';

import { Character, Info } from '../models/character.model';
import { AppParams } from '../models/params.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatPaginatorModule,
    MatCardModule,
    MatButton,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    NgOptimizedImage,
  ],
  selector: 'app-home',
  standalone: true,
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private basketService = inject(BasketService);
  private cdr = inject(ChangeDetectorRef);
  private rmortyService = inject(RmortyService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  characters: Character[] = [];
  info: Info = {
    count: 0,
    next: null,
    pages: 0,
    prev: null,
  };
  nameControl = new FormControl();

  params: AppParams = {
    gender: null,
    name: '',
    page: '1',
    species: '',
    status: null,
    type: '',
  };
  constructor() {
    this.route.queryParams.subscribe(params => {
      Object.keys(this.params).map(paramsKey => {
        this.params[paramsKey] = params[paramsKey];
      });
    });

    this.rmortyService.getCharacters(this.params).subscribe({
      error: () => this.snackBar.open('Error fetching characters', 'close'),
      next: data => {
        {
          this.characters = data.results;
          this.info = data.info;
        }
        this.cdr.markForCheck();
      },
    });

    this.nameControl.valueChanges
      .pipe(debounceTime(500), tap(console.log))
      .subscribe((name: string) => {
        this.updateQueryAndRequest({ name });
      });
  }

  addToBasket(characterId: number) {
    const originalCharacters = [...this.characters];
    this.characters = this.characters.map(ch =>
      ch.id === characterId ? { ...ch, ticketCount: ch.ticketCount + 1 } : ch
    );
    this.basketService.addToBasket(characterId).subscribe({
      error: () => {
        this.characters = originalCharacters;
        this.cdr.markForCheck();
      },
    });
  }
  handlePageEvent(event: PageEvent) {
    if (event.previousPageIndex !== event.pageIndex) {
      this.updateQueryAndRequest({
        page: (event.pageIndex + 1).toString(),
      });
    }
  }

  removeFromBasket(characterId: number) {
    const originalCharacters = [...this.characters];
    this.characters = this.characters.map(ch =>
      ch.id === characterId ? { ...ch, ticketCount: ch.ticketCount - 1 } : ch
    );
    this.basketService.removeFromBasket(characterId).subscribe({
      error: () => {
        this.characters = originalCharacters;
        this.cdr.markForCheck();
      },
    });
  }

  updateQueryAndRequest(params: Partial<AppParams>) {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge', // Preserve existing query parameters
      relativeTo: this.route,
    });
    this.params = { ...this.params, ...params };
    this.rmortyService.getCharacters(this.params).subscribe({
      error: () => this.snackBar.open('Some server error'),
      next: data => {
        this.characters = data.results;
        this.info = data.info;
        this.cdr.markForCheck();
      },
    });
  }
  updateQueryParamsClick() {
    this.updateQueryAndRequest({ gender: 'male' });
  }
}
