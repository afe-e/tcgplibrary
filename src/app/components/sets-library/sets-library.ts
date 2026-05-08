// features/expansions/sets-library.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, output, signal } from '@angular/core';
import { ExpansionService } from '../../services/expansion.service';
import { CardGridItem } from '../../models/card/card-grid-item.model';
import { CardGrid } from '../../components/card-grid/card-grid';

/**
 * Componente contenedor (smart component).
 * Responsabilidad única: pedir expansiones al servicio y pasarlas a CardGrid.
 * No contiene lógica de renderizado — eso lo hace CardGrid.
 */
@Component({
  selector: 'app-sets-library',
  standalone: true,
  imports: [CommonModule, CardGrid],
  templateUrl: './sets-library.html',
  styleUrl: './sets-library.css',
})
export class SetsLibrary implements OnInit {
  setSelected = output<CardGridItem>();

  items        = signal<CardGridItem[]>([]);
  isLoading    = signal(true);
  errorMessage = signal('');

  constructor(private readonly expansionService: ExpansionService) {}

  ngOnInit(): void {
    this.load();
  }

  private async load(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set('');
    try {
      const expansions = await this.expansionService.getExpansionsBySeries('tcgp');
      if (!expansions.length) {
        this.errorMessage.set('No se encontraron expansiones.');
        return;
      }
      this.items.set(
        expansions.map(e => ({
          id:       e.id,
          title:    e.name,
          subtitle: e.id,
          imageUrl: e.logoUrl,
        }))
      );
    } catch {
      this.errorMessage.set('Error al cargar las expansiones.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
