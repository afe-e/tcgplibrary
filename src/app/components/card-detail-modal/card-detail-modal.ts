import { Component, Input, Output, EventEmitter, OnInit, signal, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TCGDexService } from '../../services/tcgp.service';
import { Card } from '@tcgdex/sdk';

@Component({
  selector: 'app-card-detail-modal',
  imports: [CommonModule],
  templateUrl: './card-detail-modal.html',
  styleUrl: './card-detail-modal.css',
})
export class CardDetailModal implements OnInit, OnChanges {
  @Input() cardId: string | null = null;
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  private readonly tcgService = inject(TCGDexService);
  readonly cardDetails = signal<Card | null>(null);
  readonly isLoading = signal(false);

  async ngOnInit() {
    if (this.cardId) {
      await this.loadCardDetails();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cardId'] && changes['cardId'].currentValue && this.isOpen) {
      this.loadCardDetails();
    }
  }

  async loadCardDetails() {
    if (!this.cardId) return;
    
    this.isLoading.set(true);
    try {
      const card = await this.tcgService.client.card.get(this.cardId);
      this.cardDetails.set(card);
    } catch (error) {
      console.error('Error loading card details:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  close() {
    this.closeModal.emit();
  }

  onBackdropClick() {
    this.close();
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  hasLength(value: any): boolean {
    return value && Array.isArray(value) && value.length > 0;
  }
}
