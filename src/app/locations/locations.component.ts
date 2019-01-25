import { Component, OnInit } from '@angular/core';
import { Location } from '../models/location';
import { LoggerService } from 'src/common/services/logger.service';
import { LocationService } from 'src/common/services/location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  private myLocations: Location[];

  public constructor(
    private loggerService: LoggerService,
    private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.getLocations().subscribe(
      (result: Location[]) => {
        this.myLocations = result;
      });
  }

}
