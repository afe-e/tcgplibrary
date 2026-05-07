// library.ts
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { CardGridItem } from '../card-grid/card-grid';
import { CardsLibrary } from '../cards-library/cards-library';
import { SetsLibrary } from '../sets-library/sets-library';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, SetsLibrary, CardsLibrary],
  templateUrl: './library.html',
  styleUrl: './library.css',
})
export class Library {
  selectedSet = signal<CardGridItem | null>(null);
}