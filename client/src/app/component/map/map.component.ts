import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GameService} from "../../shared/services/game.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @ViewChild('map')
  private map: ElementRef = {} as ElementRef;

  data = {
    "turrets": [
      {
        "RED": [
          // "top_lane"
          {"x": 4318, "y": 13875},
          {"x": 7943, "y": 13411},
          {"x": 10481, "y": 13650},
          // "mid_lane"
          {"x": 8955, "y": 8510},
          {"x": 9767, "y": 10113},
          {"x": 11134, "y": 11207},
          // "bot_lane"
          {"x": 13866, "y": 4505},
          {"x": 13624, "y": 10572},
          {"x": 13327, "y": 8226},
          // "nexus"
          {"x": 13252, "y": 12730},
          {"x": 12823, "y": 13193},
        ],
        "BLUE": [
          // "top_lane"
          {"x": 981, "y": 10441},
          {"x": 1512, "y": 6699},
          {"x": 1169, "y": 4287},
          // "mid_lane"
          {"x": 3651, "y": 3696},
          {"x": 5846, "y": 6396},
          {"x": 5048, "y": 4812},
          // "bot_lane"
          {"x": 6919, "y": 1483},
          {"x": 10504, "y": 1029},
          {"x": 4281, "y": 1253},
          // "nexus"
          {"x": 1748, "y": 2270},
          {"x": 2177, "y": 1807},
        ]
      }
    ]
  }

  constructor(private gameService: GameService, private ctx: CanvasRenderingContext2D) { }

  ngOnInit(): void {
    // let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('map');
    // this.ctx = canvas.getContext("2d");

    this.gameService.getGames();
    this.ctx = this.map.nativeElement.getContext('2d');
  }

  turretsPosition() {
    this.data.turrets.forEach(el => {
      el.RED.forEach(e => {
        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.arc(this.toX(e.x), this.toY(e.y), 10, 0, 2 * Math.PI);
        this.ctx.fill();
      });

      el.BLUE.forEach(e => {
        this.ctx.fillStyle = "blue";
        this.ctx.beginPath();
        this.ctx.arc(this.toX(e.x), this.toY(e.y), 10, 0, 2 * Math.PI);
        this.ctx.fill();
      });
    })
  }

  mobsPosition() {
    /*this.ctx.fillStyle = "white";
    // DRAGONS
    this.ctx.beginPath();
    this.ctx.arc(this.toX(10100), this.toY(4480), 10, 0, 2 * Math.PI);
    this.ctx.fill();

    // BARON + HERALD
    this.ctx.beginPath();
    this.ctx.arc(this.toX(5000), this.toY(10600), 10, 0, 2 * Math.PI);
    this.ctx.fill();*/
  }

  killsPosition() {

  }

  // CALCULS
// map 15000 px x 15000 px
// canvas taille base = 900px
// ( 900 / 15 000 ) * 100 = 6%

  toX(baseValue: number) {
    return baseValue * 0.06;
  }

  toY(baseValue: number) {
    return 900 - (baseValue * 0.06);
  }
}
