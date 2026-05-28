import { Component, inject, OnInit, signal } from '@angular/core';
import { CardFilter } from '../../components/card-filter/card-filter';
import { FilterService } from '../../services/filter.service';
import { Card } from '@tcgdex/sdk';
import { ActivatedRoute } from '@angular/router';
import { CardDetailModal } from '../../components/card-detail-modal/card-detail-modal';

@Component({
  selector: 'app-all-cards',
  imports: [CardFilter, CardDetailModal],
  templateUrl: './all-cards.html',
  styleUrl: './all-cards.css',
})
export class AllCards implements OnInit {
  private readonly filterService = inject(FilterService);
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly allCards = signal<Card[]>([]);
  readonly selectedCardId = signal<string | null>(null);
  readonly isModalOpen = signal(false);

  async ngOnInit(): Promise<void> {
    const cartasServicio = await this.filterService.getAllCards();
    this.allCards.set(cartasServicio);
    const setId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  actualizarCartasFiltradas(cartasFiltradas: any[]) {
    this.allCards.set(cartasFiltradas);
  }

  openCardDetail(cardId: string) {
    this.selectedCardId.set(cardId);
    this.isModalOpen.set(true);
  }

  closeCardDetail() {
    this.isModalOpen.set(false);
    this.selectedCardId.set(null);
  }
}