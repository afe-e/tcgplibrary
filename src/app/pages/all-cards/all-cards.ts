import { Component, inject, signal } from '@angular/core';
import { CardFilter } from '../../components/card-filter/card-filter';
import { FilterService } from '../../services/filter.service';
import { Card } from '@tcgdex/sdk';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-cards',
  imports: [],
  templateUrl: './all-cards.html',
  styleUrl: './all-cards.css',
})
export class AllCards {
  private readonly filterService = inject(FilterService);
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly allCards = signal<Card[]>([]);
  async ngOnInit(): Promise<void> {
    const allCards = await this.filterService.getAllCards();
    const setId = this.activatedRoute.snapshot.paramMap.get('id');

    if (setId) {

      this.allCards.set(allCards);
    }
  }
}