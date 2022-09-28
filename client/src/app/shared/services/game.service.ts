import { Injectable } from '@angular/core';
import { GameRepository } from 'src/app/core/repository/GameRepository';
import { GameTimelineRepository } from 'src/app/core/repository/GameTimelineRepository';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private gameRepo: GameRepository,
    private gameTimelineRepo: GameTimelineRepository
  ) { }

  getGames() {
    try {
      this.gameRepo.getAll().subscribe((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log('Game service : ' + error);
    }
  }
}
