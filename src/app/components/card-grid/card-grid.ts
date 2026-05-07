// card-grid.ts
import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

export interface CardGridItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-card-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-grid.html',
  styleUrl: './card-grid.css',
})
export class CardGrid {
  items = input.required<CardGridItem[]>();
  isLoading = input(false);
  errorMessage = input('');
  clickable = input(false);

  itemClick = output<CardGridItem>();
}