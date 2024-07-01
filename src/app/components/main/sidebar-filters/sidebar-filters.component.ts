import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-sidebar-filters',
  standalone: true,
  styleUrl: './sidebar-filters.component.scss',
  templateUrl: './sidebar-filters.component.html',
})
export class SidebarFiltersComponent {}
