import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Basket } from 'core/models/basket.interface';
import { BasketService } from 'core/services/basket.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatCardModule],
  selector: 'app-basket',
  standalone: true,
  styleUrl: './basket.component.scss',
  templateUrl: './basket.component.html',
})
export class BasketComponent {
  private basketService = inject(BasketService);
  private cdr = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);
  baskets!: Basket[];
  constructor() {
    this.basketService.getBasket().subscribe({
      error: () => this.snackBar.open('Error fetching basket', 'close'),
      next: baskets => {
        this.baskets = baskets;
        this.cdr.markForCheck();
      },
    });
  }
}
