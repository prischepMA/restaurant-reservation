import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-profile',
  templateUrl: './restaurant-profile.component.html',
  styleUrls: ['./restaurant-profile.component.scss']
})
export class RestaurantProfileComponent implements OnInit {

  lat = 51.673858;
  lng = 7.815982;
  zoom = 8;

  constructor() { }

  ngOnInit() {
  }

}
