import { Injectable } from '@angular/core';
import TCGdex, { Query } from '@tcgdex/sdk';

@Injectable({
  providedIn: 'root',
})
export class TgcpApi {
  async fetchSetsBySeries(seriesId = 'tcgp') {
    try {
      const tcg = new TCGdex();
      console.log(`TgcpApi: obteniendo sets para la serie ${seriesId}`);
      const series = await tcg.serie.get(seriesId);
      const sets = series?.sets ?? [];
      return sets.map((set: any) => ({
        ...set,
        logoUrl: this.buildSetLogoUrl(set),
      }));
    } catch (error) {
      console.error('TgcpApi: error en fetchSetsBySeries:', error);
      throw error;
    }
  }

  async fetchCardsBySet(setId: string) {
    try {
      const tcg = new TCGdex();
      console.log(`TgcpApi: obteniendo cartas para el set ${setId}`);
      const cards = await tcg.card.list(
        Query.create()
          .equal('set', setId)
      );

      return (cards ?? []).map((card: any) => ({
        ...card,
        imageUrl: this.buildCardImageUrl(card),
      }));
    } catch (error) {
      console.error('TgcpApi: error en fetchCardsBySet:', error);
      throw error;
    }
  }

  private buildSetLogoUrl(set: any): string {
    if (!set || typeof set.logo !== 'string' || !set.logo.length) {
      console.log('TgcpApi buildSetLogoUrl: sin logo', set?.id);
      return '';
    }

    return this.buildAssetUrl(set.logo, '.webp');
  }

  private buildCardImageUrl(card: any): string {
    if (!card || typeof card.image !== 'string' || !card.image.length) {
      console.log('TgcpApi buildCardImageUrl: sin image', card?.id);
      return '';
    }

    return this.buildAssetUrl(card.image, 'high.webp');
  }

  private buildAssetUrl(basePath: string, fileName: string) {
    return `${basePath}/${fileName}`;
  }
}
