import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'em-home',
  templateUrl: '../pages/home.view.html',
  styleUrls: ['../home.component.css']
})
export class HomeComponent implements OnInit {

  images = [180,0, 366].map((n) => `https://picsum.photos/id/${n}/1300/500`);
  constructor() { }

  ngOnInit(): void {
  }

}
