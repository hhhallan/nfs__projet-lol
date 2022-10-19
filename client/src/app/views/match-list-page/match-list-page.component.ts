import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/core/model/Match';
import { GameService } from 'src/app/shared/services/game.service';

@Component({
  selector: 'app-match-list-page',
  templateUrl: './match-list-page.component.html',
  styleUrls: ['./match-list-page.component.scss']
})
export class MatchListPageComponent implements OnInit {
  matches: Match[] = [];
  isLoaded: Promise<boolean> = Promise.resolve(false);

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.initMatches();
  }

  initMatches(): void {
    this.gameService.getGames().subscribe();
    this.gameService.matches$.subscribe((matches) => {
      this.matches = matches;
      this.isLoaded = Promise.resolve(true);
    });
  }
}
