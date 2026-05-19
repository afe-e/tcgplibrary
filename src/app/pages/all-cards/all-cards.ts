import { Component } from '@angular/core';
import { CardFilter } from '../../components/card-filter/card-filter';

@Component({
  selector: 'app-all-cards',
  imports: [CardFilter],
  templateUrl: './all-cards.html',
  styleUrl: './all-cards.css',
})
export class AllCards {}
