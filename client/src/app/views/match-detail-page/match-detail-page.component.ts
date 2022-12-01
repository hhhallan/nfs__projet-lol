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
  playerHasWin: boolean = false;
  isTeamKill: boolean[] = [];
  isLoaded: Promise<boolean> = Promise.resolve(false);

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const matchId: string = this.route.snapshot.params['matchId'];
    const puuid: string = this.route.snapshot.params['puuid'];
    this.initMatch(matchId, puuid);
  }

  initMatch(matchId: string, puuid: string): void {
    this.gameService.getGameByMatchId(matchId).subscribe();
    this.gameService.match$.subscribe((match) => {
      this.match = match;
      match.participants.forEach(el => {
        if (el.puuid === puuid) {
          el.win ? this.playerHasWin = true : this.playerHasWin = false;
        }
      });
      match.kills.forEach(el => {
        match.participants.forEach(e => {
          if (el.killerId === e.participantId) {
            if (this.playerHasWin === e.win) {
              this.isTeamKill.push(true);
            } else {
              this.isTeamKill.push(false);
            }
          }
        });
      });
      this.isLoaded = Promise.resolve(true);
    });
  }
}
