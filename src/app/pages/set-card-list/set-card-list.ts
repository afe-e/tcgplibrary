import { Component, inject, OnInit, signal } from '@angular/core';
import { TCGDexService } from '../../services/tcgp.service';
import { Card } from '../../models/card/card.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-set-card-list',
  imports: [],
  templateUrl: './set-card-list.html',
  styleUrl: './set-card-list.css',
})
export class SetCardList implements OnInit {
  private readonly tcgService = inject(TCGDexService);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly cards = signal<Card[]>([]);

  async ngOnInit(): Promise<void> {
    const setId = this.activatedRoute.snapshot.paramMap.get('id');

    if (setId) {
      this.cards.set(await this.tcgService.getCardsBySet(setId));
    }
  }
}
