import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match } from 'src/app/core/model/Match';
import { GameService } from 'src/app/shared/services/game.service';

@Component({
  selector: 'app-match-list-page',
  templateUrl: './match-list-page.component.html',
  styleUrls: ['./match-list-page.component.scss']
})
export class MatchListPageComponent implements OnInit {
  matches: Match[] = [];
  summonerImages: string[] = [];
  hasWin: boolean[] = [];
  kills: number[] = [];
  assists: number[] = [];
  deaths: number[] = [];
  isLoaded: Promise<boolean> = Promise.resolve(false);
  puuid: string = '';

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const puuid: string = this.route.snapshot.params['puuid'];
    this.puuid = puuid;
    this.matches = [];
    this.initMatches(puuid);
  }

  initMatches(puuid: string): void {
    this.gameService.getGamesByPuid(puuid).subscribe();
    this.gameService.matches$.subscribe((matches) => {
      this.matches = matches;
      matches.forEach(el => {
        el.participants.forEach(e => {
          if (e.puuid === puuid) {
            this.summonerImages.push(e.image);
            this.hasWin.push(e.win);
            this.kills.push(e.kills);
            this.assists.push(e.assists);
            this.deaths.push(e.deaths);
          } 
        });
      });
      this.isLoaded = Promise.resolve(true);
    });
  }
}
