import { Component, inject, OnInit, signal } from '@angular/core';
import { TGCDexService } from '../../services/api.service';
import { Expansion } from '../../models/card/expansion.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-set-list',
  imports: [RouterLink],
  templateUrl: './set-list.html',
  styleUrl: './set-list.css',
})
export class SetList implements OnInit {
  private readonly tcgService = inject(TGCDexService);

  readonly expansions = signal<Expansion[]>([]);

  async ngOnInit(): Promise<void> {
    this.expansions.set(await this.tcgService.getExpansions());
  }
}
