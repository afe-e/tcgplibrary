import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { TgcpApi } from '../../services/tgcp-api';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library.html',
  styleUrl: './library.css',
})
export class Library implements OnInit {
  sets = signal<any[]>([]);
  cards = signal<any[]>([]);
  selectedSet = signal<any | null>(null);
  isLoading = signal(true);
  errorMessage = signal('');

  constructor(private readonly tgcpApi: TgcpApi) {}

  ngOnInit() {
    this.loadSets();
  }

  async loadSets() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      const sets = await this.tgcpApi.fetchSetsBySeries('tcgp');
      console.log('DEBUG: sets recibidos:', sets);
      if (sets.length > 0) {
        console.log('DEBUG: primer set:', sets[0]);
        console.log('DEBUG: set.logo:', sets[0].logo);
      }
      this.sets.set(sets);
      if (!sets.length) {
        this.errorMessage.set('No se encontraron expansiones para TCGP.');
      }
    } catch (error) {
      console.error('Error fetching sets:', error);
      this.errorMessage.set('Error al cargar las expansiones. Revisa la consola y la conexión a la API.');
      this.sets.set([]);
    } finally {
      this.isLoading.set(false);
    }
  }

  async selectSet(set: any) {
    this.selectedSet.set(set);
    this.cards.set([]);
    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      const cards = await this.tgcpApi.fetchCardsBySet(set.id);
      this.cards.set(cards);
      if (!cards.length) {
        this.errorMessage.set('No se encontraron cartas en esta expansión.');
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
      this.errorMessage.set('Error al cargar las cartas. Revisa la consola y la conexión a la API.');
    } finally {
      this.isLoading.set(false);
    }
  }
}



