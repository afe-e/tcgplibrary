import { Injectable } from '@angular/core';
import TCGdex, { CardResume, SetResume } from '@tcgdex/sdk';
import { Expansion } from '../models/card/expansion.model';
import { Card } from '../models/card/card.model';

@Injectable({ providedIn: 'root' })
export class TGCDexService {
  private static readonly SERIE_ID = 'tcgp';

  private readonly client = new TCGdex();

  async getExpansions(): Promise<Expansion[]> {
    const result = [];
    const series = await this.client.serie.get(TGCDexService.SERIE_ID);

    if (series) {
      for (let set of series.sets) {
        result.push({
          id: set.id as string,
          name: set.name as string,
          logoUrl: this.buildExpansionLogoUrl(set),
        });
      }
    }

    return result;
  }

  async getCardsBySet(setId: string): Promise<Card[]> {
    const result = [];
    const set = await this.client.set.get(setId);
    
    if (set) {
      for (let card of set.cards) {
        result.push({
          id: card.id as string,
          name: card.name as string,
          imageUrl: this.buildCardImageUrl(card, 'low'),
        });
      }
    }

    return result;
  }

  private buildExpansionLogoUrl(set: SetResume): string {
    return set.logo ? `${set.logo}.webp` : 'coche.webp';
  }

  buildCardImageUrl(card: CardResume, quality: 'low' | 'high'): string {
    return card.image ? `${card.image}/${quality}.webp` : '';
  }
}
