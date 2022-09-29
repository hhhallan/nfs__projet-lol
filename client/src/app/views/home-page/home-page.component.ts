import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/shared/services/game.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  champions: any = null;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    // this.gameService.getGames();
    // this.gameService.getGamesTimeline();
    this.gameService.getChampions();
    // console.log(this.gameService.getChampions());
    
  }
}
