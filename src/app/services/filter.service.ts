import { Inject, Injectable } from '@angular/core';
import { TCGDexService } from './tcgp.service';
import { Card } from '@tcgdex/sdk';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private readonly tcgService = Inject(TCGDexService);
  private static readonly SERIE_ID = 'tcgp';

  async getAllCards(): Promise<Card[]> {
    const result: Card[] = [];
    
    // 1. Obtenemos la serie (contiene los sets y los resúmenes de las cartas)
    const serie = await this.tcgService.client.serie.get(FilterService.SERIE_ID);

    if (serie) {
      for (let set of serie.sets) {
        if (set.cards) {
          for (let card of set.cards) {
                result.push({
                  // Propiedades heredadas de CardResume$1
                  id: card.id,
                  name: card.name,
                  localId: card.localId,
                  image: this.tcgService.buildCardImageUrl(card, 'low'), // Tu método personalizado de imagen
                  
                  // Propiedades obligatorias de la interfaz Card$1
                  rarity: card.rarity,
                  category: card.category,
                  set: card.set, // Mapea el objeto set completo que exige la interfaz
                  legal: {
                    standard: card.legal?.standard ?? false,
                    expanded: card.legal?.expanded ?? false
                  },

                  // Propiedades opcionales de Pokémon (si existen en la carta)
                  types: card.types,
                  hp: card.hp,
                  stage: card.stage,
                  attacks: card.attacks,
                  variants: card.variants,
                  illustrator: card.illustrator
                });
            
            }
          }
        }
      }
      return result;
    }
    
  }
