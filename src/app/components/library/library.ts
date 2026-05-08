// library.ts
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { CardGridItem } from '../../models/card/card-grid-item.model';
import { CardsLibrary } from '../cards-library/cards-library';
import { SetsLibrary } from '../sets-library/sets-library';

/**
 * Componente raíz de la feature.
 * Gestiona el estado de navegación: qué expansión está seleccionada.
 * No conoce ni servicios ni lógica de dominio.
 */
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
