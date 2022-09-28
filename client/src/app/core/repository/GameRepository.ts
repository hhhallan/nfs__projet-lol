import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameRepository {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(environment.baseUrl + '/api/get-games');
  }
}
