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
tipoSeleccionado: string = ''
nombrePokemon: string = ''
}
