import { Component, inject, OnInit } from '@angular/core';
import { TgcpApi } from '../services/tgcp-api';
@Component({
  selector: 'app-card-list',
  imports: [],
  templateUrl: './card-list.html',
  styleUrl: './card-list.css',
})
export class CardList implements OnInit {
  private readonly tgcpApi = inject(TgcpApi);
  public allCards: any[] = [];
  async ngOnInit(): Promise<void> {
  this.allCards =  await this.tgcpApi.getAllCards();
  console.log(this.allCards)
  }
}
