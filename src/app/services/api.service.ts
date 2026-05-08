import { Injectable } from '@angular/core';
import TCGdex from '@tcgdex/sdk';

@Injectable({ providedIn: 'root' })
export class ApiService {
  readonly client = new TCGdex();

  buildSetLogoUrl(set: { logo?: unknown }): string {
    const logo = set?.logo;
    if (typeof logo !== 'string' || !logo) return '';
    return /\.(webp|png|jpg|jpeg)(\?.*)?$/.test(logo) ? logo : `${logo}.webp`;
  }

  buildCardImageUrl(card: { image?: unknown }): string {
    const image = card?.image;
    if (typeof image !== 'string' || !image) return '';
    return /\.(webp|png|jpg|jpeg)(\?.*)?$/.test(image) ? image : `${image}/high.webp`;
  }
}
