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
        // console.log(response);
      });
    } catch (error) {
      console.log('Game service : ' + error);
    }
  }

  getGamesTimeline() {
    try {
      this.gameTimelineRepo.getAll().subscribe((response) => {
        // console.log(response);
        // response.content.forEach(el => {

        // Liste de toutes les frames
        Object.values(response).forEach(el => {

          // console.log(el.content.info.frames)
          // Liste de tous les events
          Object.values(el.content.info.frames).forEach(ev => {

            // console.log(ev.events)

            /*ev.events.forEach(type => {
              console.log(type)
            })*/
          })

          let event_type = [];
          let champ_kills = [];

         /* fetch(frames)
            .then()

          frames.forEach(el => {

            el.events.forEach(ev => {

              // console.log(ev)

              if (ev.type = "CHAMPION_KILL" && ev.assistingParticipantIds) {
                // console.log(ev)
                let color = "black";

                if (ev.buildingType) {
                  color = "grey";
                } else if (ev.monsterSubType) {
                  color = "purple";
                } else if (ev.monsterType) {
                  color = "green";
                } else {
                  color = "pink";
                }

                // switch () {
                //
                // }
                // ev.buildingType ? color = "grey" : color = "pink";
                // ev.monsterSubType ? color = "purple" : color = "pink";
                // ev.monsterType ? color = "green" : color = "pink";

                // buildingType
                // monsterSubType
                // monsterType



                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.arc(toX(ev.position.x), toY(ev.position.y), 10, 0, 2 * Math.PI);
                ctx.fill();
              }
            })
          })*/

        })


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
