import { inject, Injectable } from '@angular/core';
import { TCGDexService } from './tcgp.service';
import { Card } from '@tcgdex/sdk';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private readonly tcgService = inject(TCGDexService); 
  
  // ID de la serie oficial para Pokémon TCG Pocket
  private static readonly SERIE_ID = 'tcgp'; 

  async getAllCards(): Promise<Card[]> {
    try {
      const result: any[] = [];

      // 1. Obtenemos la serie 'tgcp' para saber qué sets existen (A1, A1a, B1...)
      const serie = await this.tcgService.client.serie.get(FilterService.SERIE_ID);
      if (!serie || !serie.sets) return [];

      // 2. Recorremos cada set de la serie
      for (const setResume of serie.sets) {
        try {
          // ¡ESTA ES LA CLAVE!: Pedimos el SET COMPLETO con todos sus detalles.
          // Al bajarnos el set entero de golpe, todas las cartas de su interior 
          // YA VIENEN con rarity, category, types, etc. cargados de forma nativa.
          const fullSet = await this.tcgService.client.set.get(setResume.id);

          if (fullSet && fullSet.cards) {
            for (const card of fullSet.cards as any[]) {
              result.push({
                id: card.id,
                name: card.name,
                localId: card.localId,
                // Construimos la URL usando tu método inyectado
                image: this.tcgService.buildCardImageUrl(card, 'low'), 
                
                // Estas propiedades SÍ existen aquí porque vienen de fullSet.cards
                rarity: card.rarity,
                category: card.category,
                // Le metemos la información del set actual
                set: {
                  id: fullSet.id,
                  name: fullSet.name,
                  logo: fullSet.logo,
                  symbol: fullSet.symbol
                }, 
                legal: {
                  standard: card.legal?.standard ?? false,
                  expanded: card.legal?.expanded ?? false,
                },

                // Propiedades opcionales del Pokémon
                types: card.types,
                hp: card.hp,
                stage: card.stage,
                attacks: card.attacks,
                variants: card.variants,
                illustrator: card.illustrator,
              });
            }
          }
        } catch (setIndexError) {
          console.error(`Error al procesar el set ${setResume.id}:`, setIndexError);
        }
      }

      return result;

    } catch (error) {
      console.error('Error al obtener todas las cartas de TCG Pocket:', error);
      return [];
    }
  }
}