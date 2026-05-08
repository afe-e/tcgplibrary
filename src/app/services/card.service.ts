// core/services/card.service.ts
import { Injectable } from '@angular/core';
import { Card } from '../models/card/card.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CardService {
  constructor(private readonly api: ApiService) {}

  async getCardsBySet(setId: string): Promise<Card[]> {
    const set = await this.api.client.set.get(setId);
    const cards = set?.cards ?? [];
    return cards.map((card: any) => ({
      id: card.id as string,
      name: card.name as string,
      imageUrl: this.api.buildCardImageUrl(card),
    }));
  }
}
