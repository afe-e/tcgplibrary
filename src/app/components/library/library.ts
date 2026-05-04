import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import TCGdex from '@tcgdex/sdk';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library.html',
  styleUrl: './library.css',
})

export class Library {
  set: any[] = [];
  async getAllCards() {
    const tcg = new TCGdex();
    const cards = await tcg.card.list();
    this.set = cards.map((card: any) => ({
      ...card,
      img: card.getImageURL('low', 'webp')
    }));
  }


}
