import { Injectable } from '@angular/core';
import TCGdex from '@tcgdex/sdk';

@Injectable({ providedIn: 'root' })
export class TgcpApi {
  private readonly tcg = new TCGdex();

  async fetchSetsBySeries(seriesId = 'tcgp') {
    console.log(`TgcpApi: fetching sets for series ${seriesId}`);
    const series = await this.tcg.serie.get(seriesId);
    const sets = series?.sets ?? [];
    return sets.map((set: any) => ({
      ...set,
      logoUrl: this.buildSetLogoUrl(set),
    }));
  }

  async fetchCardsBySet(setId: string) {
    console.log(`TgcpApi: fetching cards for set ${setId}`);
    // Use set.get() so we get the full set object including its cards array
    const set = await this.tcg.set.get(setId);
    const cards = set?.cards ?? [];
    return cards.map((card: any) => ({
      ...card,
      imageUrl: this.buildCardImageUrl(card),
    }));
  }

private buildSetLogoUrl(set: any): string {
  const logo = set?.logo;
  if (typeof logo !== 'string' || !logo) return '';

  const hasImageExtension = /\.(webp|png|jpg|jpeg)(\?.*)?$/.test(logo);
  if (hasImageExtension) return logo;

  return `${logo}.webp`;
}

private buildCardImageUrl(card: any): string {
  const image = card?.image;
  if (typeof image !== 'string' || !image) return '';
  
  // Solo saltar si ya tiene extensión de imagen al final
  const hasImageExtension = /\.(webp|png|jpg|jpeg)(\?.*)?$/.test(image);
  if (hasImageExtension) return image;
  
  return `${image}/high.webp`;
}
}