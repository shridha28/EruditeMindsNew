import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'em-home',
  templateUrl: '../pages/home.view.html',
  styleUrls: ['../home.component.css']
})
export class HomeComponent implements OnInit {

  images = ["names1","Slide1","Slide3"].map((n) => `assets/${n}.jpg`);
  constructor() { }

  ngOnInit(): void {
  }

}
