import { Component, OnInit } from '@angular/core';
import { Summoner } from 'src/app/core/model/Summoner';
import { GameService } from 'src/app/shared/services/game.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  summoner: Summoner = <Summoner>{};
  input: HTMLInputElement = <HTMLInputElement>{};
  result: HTMLElement = <HTMLElement>{};
  link: string = '';

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.input = <HTMLInputElement>document.getElementById('search');
    this.result = <HTMLElement>document.getElementById('result');
  }

  /**
   * Fetch summoner by his and display him as HTMLElement
   * @return {void}
   */
  getSummonerByName(): void {
    if (this.input.value.length > 2) {
      this.gameService.getSummonerByName(this.input.value).subscribe();
      this.gameService.summoner$.subscribe((summoner) => {
          this.removeChilds(this.result);
          if (Object.keys(summoner)[0] !== 'status_code') {
            if (summoner) {
              this.summoner = summoner;
              this.link = '/matches/' + summoner.puuid;      
              this.formatResult(this.result, summoner);
            }
          }
      });
    } else {
      this.removeChilds(this.result);
    }
  }

  /**
   * Remove all chils node
   * @param {HTMLElement} element 
   * @return {void}
   */
  removeChilds(element: HTMLElement): void {
    if (element !== null) {
      while (element.firstChild) {
        element.style.padding = '0';
        element.removeChild(element.firstChild);
      }
    }
  }

  /**
   * Format and append HTMLElement
   * @param {HTMLElement} element 
   * @param {Summoner} summoner
   * @return {void} 
   */
  formatResult(element: HTMLElement, summoner: Summoner): void {
    const p: HTMLParagraphElement = <HTMLParagraphElement>document.createElement('p');
    const span: HTMLSpanElement = <HTMLSpanElement>document.createElement('span');

    element.style.padding = '10px';

    p.innerHTML = summoner.name;
    p.style.marginBottom = '5px';

    span.innerHTML = 'Level ' + summoner.summonerLevel;
    span.style.fontSize = '.7rem';
    span.style.fontWeight = '300';

    element.appendChild(p);
    element.appendChild(span);
  }
}
