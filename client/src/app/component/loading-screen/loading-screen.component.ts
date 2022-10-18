import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit {
  loader = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 3000);
  }
}
