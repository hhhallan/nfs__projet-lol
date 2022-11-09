import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Kill } from 'src/app/core/model/Kill';
import { MatchDetails } from 'src/app/core/model/MatchDetails';
import { turrets } from 'src/app/shared/data/turrets';
import { MapService } from 'src/app/shared/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('map') map: ElementRef = <ElementRef>{};
  @Input() match: MatchDetails = <MatchDetails>{};

  private ctx!: CanvasRenderingContext2D | null;
  turrets = turrets;
  kills: Kill[] = [];
  rangeEl: HTMLInputElement | null = null;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.kills = this.match.kills;
  }

  ngAfterViewInit() {
    this.ctx = (this.map.nativeElement as HTMLCanvasElement).getContext('2d');

    this.displayTurrets();
    this.displayNeutralMobs();
    // this.displayKills(this.kills);
    this.d(this.kills, this.match.gameDuration);
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
   * Display all kills on map
   * @param {Kill[]} kills 
   * @return {void}
   */
  displayKills(kills: Kill[]): void {
    kills.forEach(el => {
      this.ctx!.fillStyle = "black";
      this.ctx!.beginPath();
      this.ctx!.arc(this.mapService.toX(el.position.x), this.mapService.toY(el.position.y), 10, 0, 2 * Math.PI);
      this.ctx!.fill();
    });
  }

  //=============>>><<<==============//

  int(c: number) {
    setInterval(() => {
      console.log(c);
      c++
    }, 1000)
  }

  i(c: number) {
    console.log(c);
  }

  d(kills: Kill[], gameDuration: number): void {
    let c = 220;
    const it = setInterval(() => {
      // console.log(c);
      if (c !== gameDuration) {

        for (let i = 0; i < kills.length; i++) {
          if (Math.round(kills[i].timestamp / 1000) === c) {
            if (i > 0) {
              if (Math.round(kills[i].timestamp / 1000) - Math.round(kills[i - 1].timestamp / 1000) === 1) {
                if (true) {

                }
                console.log(kills[i])
              }
            }

          }
        }

        kills.forEach(el => {
          
          if (Math.round(el.timestamp / 1000) === c) {
            const img = new Image();
            img.src = el.victimImage;
            img.onload = () => {
              // this.ctx!.fillStyle = "black";
              this.ctx!.beginPath();
              // this.ctx!.arc(this.mapService.toX(el.position.x), this.mapService.toY(el.position.y), 10, 0, 2 * Math.PI);
              this.ctx!.drawImage(img, this.mapService.toX(el.position.x), this.mapService.toY(el.position.y), 40, 40)
              this.ctx!.fill();
              setTimeout(() => {
                this.ctx!.clearRect(this.mapService.toX(el.position.x), this.mapService.toY(el.position.y), 40, 40);
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

  // d(kills: Kill[], gameDuration: number):void {
  //   this.rangeEl = <HTMLInputElement>document.getElementById('rangeEl');
  //   if (this.rangeEl !== null) {
  //     this.rangeEl.min = "0";
  //     this.rangeEl.max = gameDuration.toString();
  //     this.rangeEl.step = (1 / 60).toString();
  //     this.rangeEl.value = "0";

  //     this.rangeEl.addEventListener('change', () => {
  //       console.log(this.rangeEl?.value);
  //     });

      
  //   }
  //   // console.log(kills);
  //   // console.log(gameDuration);
  // }


  //=============>>><<<==============//
}


//=============>>><<<==============//

export interface Point {
  x: number;
  y: number;
  t: number;
}