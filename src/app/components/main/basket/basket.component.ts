import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-basket',
  standalone: true,
  styleUrl: './basket.component.scss',
  templateUrl: './basket.component.html',
})
export class BasketComponent {}
