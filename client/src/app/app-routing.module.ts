import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './views/home-page/home-page.component';
import { MatchDetailPageComponent } from './views/match-detail-page/match-detail-page.component';
import { MatchListPageComponent } from './views/match-list-page/match-list-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'matches/:puuid', component: MatchListPageComponent},
  {path: 'match/:matchId', component: MatchDetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
