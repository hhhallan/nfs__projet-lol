import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Kill } from 'src/app/core/model/Kill';
import { MatchDetails } from 'src/app/core/model/MatchDetails';
import { Position } from 'src/app/core/model/Position';
import { turrets } from 'src/app/shared/data/turrets';
import { ConvertSecondsToMinutesSecondsPipe } from 'src/app/shared/services/convert-seconds-to-minutes-seconds.pipe';
import { MapService } from 'src/app/shared/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('map') map: ElementRef = <ElementRef>{};
  @ViewChild('killsMap') killsMap: ElementRef = <ElementRef>{};
  @Input() match: MatchDetails = <MatchDetails>{};

  private ctx: CanvasRenderingContext2D | null = null;
  private killctx: CanvasRenderingContext2D | null = null;
  turrets = turrets;
  kills: Kill[] = [];
  rangeEl: HTMLInputElement | null = null;
  timer: HTMLInputElement | null = null;

  constructor(
    private mapService: MapService,
    private convertPipe: ConvertSecondsToMinutesSecondsPipe
  ) { }

  ngOnInit(): void {
    this.kills = this.match.kills;
  }

  ngAfterViewInit() {
    this.ctx = (this.map.nativeElement as HTMLCanvasElement).getContext('2d');
    this.killctx = (this.killsMap.nativeElement as HTMLCanvasElement).getContext('2d');

    this.displayTurrets();
    this.displayNeutralMobs();
    this.displayKills(this.kills, this.match.gameDuration);
  }

  /**
   * Display turrets on map
   * @return {void}
   */
  displayTurrets(): void {
    this.turrets.forEach(el => {
      el.red.forEach(e => {
        this.ctx!.fillStyle = "red";
        this.ctx!.beginPath();
        this.ctx!.arc(this.mapService.toX(e.x), this.mapService.toY(e.y), 10, 0, 2 * Math.PI);
        this.ctx!.fill();
      });
      el.blue.forEach(e => {
        this.ctx!.fillStyle = "blue";
        this.ctx!.beginPath();
        this.ctx!.arc(this.mapService.toX(e.x), this.mapService.toY(e.y), 10, 0, 2 * Math.PI);
        this.ctx!.fill();
      });
    })
  }

  /**
   * Display neutral mobs on map
   * @return {void}
   */
  displayNeutralMobs(): void {
    this.ctx!.fillStyle = "white";
    // DRAGONS
    this.ctx!.beginPath();
    this.ctx!.arc(this.mapService.toX(10100), this.mapService.toY(4480), 10, 0, 2 * Math.PI);
    this.ctx!.fill();

    // BARON + HERALD
    this.ctx!.beginPath();
    this.ctx!.arc(this.mapService.toX(5000), this.mapService.toY(10600), 10, 0, 2 * Math.PI);
    this.ctx!.fill();
  }

  /**
   * Reposition point too close
   * @param {number} positionX1
   * @param {number} positionX2
   * @return {number}
   */
  repositionXPoint(positionX1: number, positionX2: number): number {
    return (positionX1 - (positionX1 - positionX2)) + 690;
  }

  /**
   * Check if kill position top or bottom are near
   * @param positionY1 
   * @param positionY2 
   * @returns {boolean}
   */
  isNearedUpOrDown(positionY1: number, positionY2: number): boolean {
    if (positionY1 < positionY2 || positionY1 === positionY2) {
      let betweenDif = positionY2 - positionY1;
      if (betweenDif <= 1200) {
        return true
      } else {
        return false;
      }
    } 
    if (positionY1 > positionY2) {
      let betweenDif = positionY1 - positionY2;
      if (betweenDif <= 1200) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  /**
     * Display all kills on map
     * @param {Kill[]} kills 
     * @return {void}
   */
  displayKills(kills: Kill[], gameDuration: number): void {
    let c: number = 0;
    this.rangeEl = <HTMLInputElement>document.getElementById('rangeEl');
    this.timer = <HTMLInputElement>document.getElementById('timer');
    if (this.rangeEl !== null) {
      this.rangeEl.min = "0";	
      this.rangeEl.max = gameDuration.toString();	
      this.rangeEl.step = (1 / 60).toString();	
      this.rangeEl.value = "0";
    }
    if (this.timer !== null) {
      this.timer.innerText = this.convertPipe.transform(c);
    }
    const it = setInterval(() => {
      this.rangeEl!.value = c.toString();
      this.timer!.innerText = this.convertPipe.transform(c);
      if (c !== gameDuration) {
        for (let i = 0; i < kills.length; i++) {
          if (Math.round(kills[i].timestamp / 1000) === c) {
            if (i > 0) {
              const killTime: number = Math.round(kills[i].timestamp / 1000);
              const beforeKillTime: number = Math.round(kills[i - 1].timestamp / 1000);
              if (killTime - beforeKillTime === 1 || killTime - beforeKillTime === 0) {
                const killPosition: Position = kills[i].position;
                const beforeKillPosition: Position = kills[i - 1].position;
                if (this.isNearedUpOrDown(killPosition.y, beforeKillPosition.y)) {
                  if (beforeKillPosition.x < killPosition.x || beforeKillPosition.x === killPosition.x) {
                    killPosition.x = this.repositionXPoint(killPosition.x, beforeKillPosition.x);
                  } else {
                    killPosition.x = this.repositionXPoint(beforeKillPosition.x, killPosition.x);
                  }
                }
              }
            }
          }
        }
        kills.forEach(el => {
          if (Math.round(el.timestamp / 1000) === c) {
            const img = new Image();
            img.src = el.victimImage;
            img.onload = () => {
              this.killctx!.beginPath();
              this.killctx!.drawImage(img, this.mapService.toX(el.position.x), this.mapService.toY(el.position.y), 40, 40)
              this.killctx!.fill();
              setTimeout(() => {
                this.killctx!.clearRect(this.mapService.toX(el.position.x), this.mapService.toY(el.position.y), 40, 40);
              }, 1000);
            }
          }
        });
        c++
      } else {
        clearInterval(it);
      }
    }, 1000)
  }
}
