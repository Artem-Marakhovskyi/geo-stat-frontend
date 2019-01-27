import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/common/services/location.service';
import { Location } from '../models/location';
import { MapConfiguration } from './map.configuration';
import { GroupUser } from '../models/groupUser';
import { UserService } from 'src/common/services/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private usersLocations = new Array<Location[]>(0);
  private index = 0;

  constructor(
    private locationService: LocationService,
    private userService: UserService,
    private mapConfiguration: MapConfiguration) { }

  ngOnInit() {
    this.mapConfiguration.shuffleColors();

    this.userService.getUsersForGroup('ff3a9e6d58f7474ca11451ecb32a93c5')
      .toPromise()
      .then(users => {
        users.forEach(element => {
          this.locationService.getLocationsForUser(element.userId)
            .toPromise()
            .then(locations => {
              this.usersLocations.push(locations);
            })
        });
      });
    console.log(this.usersLocations);
  }

}
