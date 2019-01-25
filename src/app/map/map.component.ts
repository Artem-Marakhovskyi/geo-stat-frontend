import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/common/services/location.service';
import { Location } from '../models/location';
import { MapConfiguration } from './map.configuration';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private userLocations: Location[];
  private userId = 'f46b7a360f634909989eac5e3a0bdbe3';

  constructor(
    private locationService: LocationService,
    private mapConfiguration: MapConfiguration) { }

  ngOnInit() {
    this.locationService.getLocations()
      .subscribe((result: Location[]) => {
        this.userLocations = result.filter(l => l.userId === this.userId);
      });
  }

}
