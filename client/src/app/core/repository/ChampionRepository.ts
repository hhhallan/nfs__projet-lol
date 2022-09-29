import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChampionRepository {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get('https://ddragon.leagueoflegends.com/cdn/12.18.1/data/fr_FR/champion.json');
  }
}
