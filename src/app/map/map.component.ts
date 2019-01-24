import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private lat: Number = 49.994490;
  private lng: Number = 36.232963;
  private zoom: Number = 15;

  constructor() { }

  ngOnInit() {
  }

}
