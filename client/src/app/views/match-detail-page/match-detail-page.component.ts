import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchDetails } from 'src/app/core/model/MatchDetails';
import { GameService } from 'src/app/shared/services/game.service';

@Component({
  selector: 'app-match-detail-page',
  templateUrl: './match-detail-page.component.html',
  styleUrls: ['./match-detail-page.component.scss']
})
export class MatchDetailPageComponent implements OnInit {
  match: MatchDetails = <MatchDetails>{};
  isLoaded: Promise<boolean> = Promise.resolve(false);

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const matchId: string = this.route.snapshot.params['matchId'];
    this.initMatch(matchId);
  }

  initMatch(matchId: string): void {
    this.gameService.getGameByMatchId(matchId).subscribe();
    this.gameService.match$.subscribe((match) => {
      this.match = match;
      this.isLoaded = Promise.resolve(true);
      console.log(this.match.gameDuration);
    });
  }
}
