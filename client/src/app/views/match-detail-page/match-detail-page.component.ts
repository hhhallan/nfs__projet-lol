import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Match} from 'src/app/core/model/Match';
import {GameService} from 'src/app/shared/services/game.service';

@Component({
  selector: 'app-match-detail-page',
  templateUrl: './match-detail-page.component.html',
  styleUrls: ['./match-detail-page.component.scss']
})
export class MatchDetailPageComponent implements OnInit {
  match: Match = <Match>{};
  isLoaded: Promise<boolean> = Promise.resolve(false);

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];
    this.initMatch(id);
  }

  initMatch(id: string): void {
    this.gameService.getGame(id).subscribe();
    this.gameService.match$.subscribe((match) => {
      this.match = match;
      this.isLoaded = Promise.resolve(true);
      console.log(this.match)
    });
  }

  roundTimestamp(timestamp: number): number {
    return Math.round((timestamp / 60000) * 100) / 100;
  }
}
