// core/services/expansion.service.ts
import { Injectable } from '@angular/core';
import { Card } from '../models/card/card.model';
import { ApiService } from './api.service';
import { Expansion } from '../models/card/expansion.model';

@Injectable({ providedIn: 'root' })
export class ExpansionService {
  constructor(private readonly api: ApiService) {}

  async getExpansionsBySeries(seriesId = 'tcgp'): Promise<Expansion[]> {
    const series = await this.api.client.serie.get(seriesId);
    const sets = series?.sets ?? [];
    return sets.map((set: any) => ({
      id: set.id as string,
      name: set.name as string,
      logoUrl: this.api.buildSetLogoUrl(set),
    }));
  }
}
