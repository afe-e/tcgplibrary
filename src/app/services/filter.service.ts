import { inject, Injectable } from '@angular/core';
import { TCGDexService } from './tcgp.service';
import { Card } from '@tcgdex/sdk';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  // 1. Corregido: 'inject' en minúscula para Angular moderno
  private readonly tcgService = inject(TCGDexService); 
  
  // Prefijo que comparten todas las cartas de TCG Pocket en la API (a1, a1a, b1...)
  private static readonly POCKET_PREFIX = 'a'; 

  async getAllCards(): Promise<Card[]> {
    try {
      // 2. ¡Traemos la lista masiva con TODOS los detalles de golpe!
      // Usar card.list() descarga el catálogo completo y evita bucles lentos.
      const allCardsFull = await this.tcgService.client.card.list();

      if (!allCardsFull) return [];

      // 3. Filtramos y mapeamos únicamente las cartas que pertenecen a TCG Pocket
      return allCardsFull
        .filter((card: any) => card.id.toLowerCase().startsWith(FilterService.POCKET_PREFIX))
        .map((card: any) => ({
          id: card.id,
          name: card.name,
          localId: card.localId,
          // Usamos tu método inyectado correctamente
          image: this.tcgService.buildCardImageUrl(card, 'low'), 
          
          // Ahora estas propiedades SÍ existen porque vienen del listado detallado
          rarity: card.rarity,
          category: card.category,
          set: card.set, 
          legal: {
            standard: card.legal?.standard ?? false,
            expanded: card.legal?.expanded ?? false,
          },

          // Propiedades opcionales
          types: card.types,
          hp: card.hp,
          stage: card.stage,
          attacks: card.attacks,
          variants: card.variants,
          illustrator: card.illustrator,
        }));

    } catch (error) {
      console.error('Error al obtener todas las cartas de TCG Pocket:', error);
      return [];
    }
  }
}