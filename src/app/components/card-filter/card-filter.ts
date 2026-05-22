import { Component } from '@angular/core';
import TCGdex, { Query } from '@tcgdex/sdk';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-filter',
  imports: [FormsModule],
  templateUrl: './card-filter.html',
  styleUrl: './card-filter.css',
})
export class CardFilter {
  tipoSeleccionado: string = '';
  nombrePokemon: string = '';
  varianteSeleccionada: string = '';
  setSeleccionado: string = '';
  categoriaSeleccionada: string = '';

  async busquedaCartas() {
    const client = new TCGdex('en');
    const cartasFiltradas = await client.card.list(
      Query.create()
        .contains('name', this.nombrePokemon)
        .equal('types', this.tipoSeleccionado)
        .equal('variants', this.varianteSeleccionada)
        .equal('set.id', this.setSeleccionado)
        .equal('category', this.categoriaSeleccionada)

    );
    return cartasFiltradas;
  }
}
