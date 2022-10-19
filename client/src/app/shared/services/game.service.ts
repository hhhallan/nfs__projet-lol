import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject } from 'rxjs';
import { Champion } from 'src/app/core/model/Champion';
import { Match } from 'src/app/core/model/Match';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private matchSource = new ReplaySubject<Match>(1);
  private matchesSource = new ReplaySubject<Match[]>(1);
  private championSource = new ReplaySubject<Champion>(1);
  match$ = this.matchSource.asObservable();
  matches$ = this.matchesSource.asObservable();
  champion$ = this.championSource.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Fetch match details
   * @param {string} id id of match => ex: EUW1_6082400874 
   * @returns {Observable<void>}
   */
  getGame(id: string): Observable<void>  {
    return this.http.get<Match>(environment.baseUrl + '/api/get-game/' + id).pipe(
      map((match: Match) => {
        if (match) {
          this.matchSource.next(match);
        }
      })
    );
  }

  /**
   * Fetch all matches details
   * @returns {Observable<void>}
   */
  getGames(): Observable<void> {
    return this.http.get<Match[]>(environment.baseUrl + '/api/get-games').pipe(
      map((matches: Match[]) => {
        if (matches) {
          this.matchesSource.next(matches);
        }
      })
    );
  }

  /**
   * Fetch champion details
   * @param {number} id  
   * @returns {Observable<void>}
   */
  getChampion(id: number): Observable<void> {
    return this.http.get<Champion>(environment.baseUrl + '/api/get-champion/' + id).pipe(
      map((champion: Champion) => {
        if (champion) {
          this.championSource.next(champion);
        }
      })
    );
  }
}
