// cards-library.ts
import { CommonModule } from '@angular/common';
import { Component, input, OnChanges, signal } from '@angular/core';
import { TgcpApi } from '../../services/tgcp-api';
import { CardGrid, CardGridItem } from '../card-grid/card-grid';

@Component({
  selector: 'app-cards-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards-library.html',
  styleUrl: './cards-library.css',
})
export class CardsLibrary implements OnChanges {
  setId = input.required<string>();

  items = signal<CardGridItem[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  constructor(private readonly tgcpApi: TgcpApi) {}

  ngOnChanges() {
    this.load();
  }

  private async load() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    try {
      const cards = await this.tgcpApi.fetchCardsBySet(this.setId());
      this.items.set(cards.map(card => ({
        id: card.id,
        title: card.name,
        subtitle: card.id,
        imageUrl: card.imageUrl,
      })));
      if (!cards.length) this.errorMessage.set('No se encontraron cartas.');
    } catch {
      this.errorMessage.set('Error al cargar las cartas.');
    } finally {
      this.isLoading.set(false);
    }
  }
}