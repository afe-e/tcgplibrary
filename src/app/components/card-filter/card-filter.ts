import { Component,  Output, EventEmitter } from '@angular/core';
import TCGdex, { Query } from '@tcgdex/sdk';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-filter',
  imports: [FormsModule],
  templateUrl: './card-filter.html',
  styleUrl: './card-filter.css',
})
export class CardFilter {
  @Output() onBusquedaFinalizada = new EventEmitter<any[]>();
  tipoSeleccionado: string = '';
  nombrePokemon: string = '';
  varianteSeleccionada: string = '';
  setSeleccionado: string = '';
  categoriaSeleccionada: string = '';

  async busquedaCartas() {
    const client = new TCGdex('en');
    const series = await client.fetch('series', 'tcgp');
    const cartasFiltradas = await client.card.list(
      Query.create()
        .contains('name', this.nombrePokemon || '')
        //.includes('types', this.tipoSeleccionado)
        //.equal('variants', this.varianteSeleccionada)
        .includes('set.id', this.setSeleccionado || '')
        //.equal('category', this.categoriaSeleccionada)
        .sort('localId', 'DESC') 
    );
    this.onBusquedaFinalizada.emit(cartasFiltradas);
  }
}
