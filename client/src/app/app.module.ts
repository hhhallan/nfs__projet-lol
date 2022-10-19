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
import { GameRepository } from './core/repository/GameRepository';
import { GameTimelineRepository } from './core/repository/GameTimelineRepository';
import { LoadingScreenComponent } from './component/loading-screen/loading-screen.component';
import {CommonModule} from "@angular/common";
import { TimelineComponent } from './component/timeline/timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    LoadingScreenComponent,
    TimelineComponent
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
    GameRepository,
    GameTimelineRepository,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
