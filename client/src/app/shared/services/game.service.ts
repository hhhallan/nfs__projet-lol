import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { ChampionRepository } from 'src/app/core/repository/ChampionRepository';
import { GameRepository } from 'src/app/core/repository/GameRepository';
import { GameTimelineRepository } from 'src/app/core/repository/GameTimelineRepository';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private gameRepo: GameRepository,
    private gameTimelineRepo: GameTimelineRepository,
    private championRepository: ChampionRepository
  ) { }

  getGames() {
    try {
      this.gameRepo.getAll().subscribe((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log('Game service <getGames> : ' + error);
    }
  }

  getGamesTimeline() {
    try {
      this.gameTimelineRepo.getAll().subscribe((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log('Game service <getGamesTimeline> : ' + error);
    }
  }

  getChampions() {
   
      this.championRepository.getAll().subscribe({   
        next(response) {
           console.log(response);
        }, error(msg) {
          console.log('Game service <getChampions> : ' + msg);
        }
      });
  }
}
