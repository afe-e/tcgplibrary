// features/cards/cards-library.ts
import { CommonModule } from '@angular/common';
import { Component, effect, input, signal } from '@angular/core';
import { CardService } from '../../services/card.service';
import { CardGridItem } from '../../models/card/card-grid-item.model';
import { CardGrid } from '../card-grid/card-grid';

/**
 * Componente contenedor (smart component).
 * Responsabilidad única: pedir cartas al servicio cuando cambia setId,
 * y pasarlas a CardGrid para que las renderice.
 *
 * Usa effect() en lugar de ngOnChanges para reaccionar a cambios de signal
 * de forma explícita y sin lifecycle hooks adicionales.
 */
@Component({
  selector: 'app-cards-library',
  standalone: true,
  imports: [CommonModule, CardGrid],
  templateUrl: './cards-library.html',
  styleUrl: './cards-library.css',
})
export class CardsLibrary {
  setId = input.required<string>();

  items        = signal<CardGridItem[]>([]);
  isLoading    = signal(true);
  errorMessage = signal('');

  constructor(private readonly cardService: CardService) {
    // effect() se ejecuta cuando setId cambia, sin necesidad de ngOnChanges
    effect(() => {
      const id = this.setId();
      if (id) this.load(id);
    });
  }

  private async load(setId: string): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.items.set([]);
    try {
      const cards = await this.cardService.getCardsBySet(setId);
      if (!cards.length) {
        this.errorMessage.set('No se encontraron cartas.');
        return;
      }
      this.items.set(
        cards.map(c => ({
          id:       c.id,
          title:    c.name,
          subtitle: c.id,
          imageUrl: c.imageUrl,
        }))
      );
    } catch {
      this.errorMessage.set('Error al cargar las cartas.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
