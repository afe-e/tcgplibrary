import { Injectable } from '@angular/core';
import TCGdex from '@tcgdex/sdk';

@Injectable({
  providedIn: 'root',
})

export class TgcpApi {
  private readonly tcgdex = new TCGdex('en');
  async getAllCards() {
    return await this.tcgdex.card.list();
  }
}
