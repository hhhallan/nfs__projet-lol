import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './component/common/header/header.component';
import { FooterComponent } from './component/common/footer/footer.component';
import { MapComponent } from './component/map/map.component';
import { GameService } from './shared/services/game.service';
import { LoadingScreenComponent } from './component/loading-screen/loading-screen.component';
import {CommonModule} from "@angular/common";
import { TimelineComponent } from './component/timeline/timeline.component';
import { MatchListPageComponent } from './views/match-list-page/match-list-page.component';
import { MatchDetailPageComponent } from './views/match-detail-page/match-detail-page.component';
import { ConvertMsToMinutesSecondsPipe } from './shared/services/convert-ms-to-minutes-seconds.pipe';
import { ConvertSecondsToMinutesSecondsPipe } from './shared/services/convert-seconds-to-minutes-seconds.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    LoadingScreenComponent,
    TimelineComponent,
    MatchListPageComponent,
    MatchDetailPageComponent,
    ConvertMsToMinutesSecondsPipe,
    ConvertSecondsToMinutesSecondsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    CommonModule
  ],
  providers: [
    GameService,
    ConvertMsToMinutesSecondsPipe,
    ConvertSecondsToMinutesSecondsPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
