// sets-library.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, output, signal } from '@angular/core';
import { TgcpApi } from '../../services/tgcp-api';
import { CardGrid, CardGridItem } from '../card-grid/card-grid';

@Component({
  selector: 'app-sets-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sets-library.html',
  styleUrl: './sets-library.css',
})
export class SetsLibrary implements OnInit {
  setSelected = output<CardGridItem>();

  items = signal<CardGridItem[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  constructor(private readonly tgcpApi: TgcpApi) {}

  ngOnInit() {
    this.load();
  }

  private async load() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    try {
      const sets = await this.tgcpApi.fetchSetsBySeries('tcgp');
      this.items.set(sets.map(set => ({
        id: set.id,
        title: set.name,
        subtitle: set.id,
        imageUrl: set.logoUrl,
      })));
      if (!sets.length) this.errorMessage.set('No se encontraron expansiones.');
    } catch {
      this.errorMessage.set('Error al cargar las expansiones.');
    } finally {
      this.isLoading.set(false);
    }
  }
}