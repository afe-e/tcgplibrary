import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Library } from "./components/library/library";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Library],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tgcplibrary');
}
