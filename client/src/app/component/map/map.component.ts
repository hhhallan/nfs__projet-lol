import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { turrets } from 'src/app/shared/data/turrets';
import { MapService } from 'src/app/shared/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('map') map: ElementRef | undefined;
  private ctx!: CanvasRenderingContext2D | null;
  turrets = turrets;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.ctx = (this.map!.nativeElement as HTMLCanvasElement).getContext('2d');

    this.displayTurrets();
    this.displayNeutralMobs();

    this.killsPosition();
  }

  /**
   * Display turrets on map
   * @returns {void}
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
   * @returns {void}
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

  killsPosition() {
    
  }
}
