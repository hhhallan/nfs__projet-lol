import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  max: number = 100;

  constructor() { }

  ngOnInit(): void {
  }

  rangeValue() {
    // @ts-ignore
    console.log(document.querySelector(".range").value)


  }

}
