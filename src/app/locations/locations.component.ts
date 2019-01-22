import { Component, OnInit } from '@angular/core';
import { Location } from '../models/location';
import { Group } from '../models/group';
import { HttpService } from 'src/common/services/http.service';
import { LoggerService } from 'src/common/services/logger.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  private myLocations: Location[];

  public constructor(
    private loggerService: LoggerService,
    private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getLocations().subscribe(
      (result: Location[]) => {
        this.myLocations = result;
      });
  }

}
