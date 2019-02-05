import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/common/services/location.service';
import { Location } from '../models/location';
import { MapConfiguration } from './map.configuration';
import { UserService } from 'src/common/services/user.service';
import { GroupService } from 'src/common/services/group.service';
import { GeoStatUser } from '../models/geoStatUser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private usersLocations = new Array<Location[]>(0);
  private users: GeoStatUser[];
  private index = 0;
  private groupName: String;

  constructor(
    private locationService: LocationService,
    private userService: UserService,
    private groupService: GroupService,
    private mapConfiguration: MapConfiguration) { }

  ngOnInit() {
    // this.userService.getUserById('')
    this.mapConfiguration.shuffleColors();

    this.groupService.getGroupById('ff3a9e6d58f7474ca11451ecb32a93c5')
      .subscribe(group => {
        this.groupName = group[0].label;
      });

    this.userService.getUsersForGroup('ff3a9e6d58f7474ca11451ecb32a93c5')
      .toPromise()
      .then(users => {
        users.forEach(element => {
          this.locationService.getLocationsForUser(element.userId)
            .toPromise()
            .then(locations => {
              this.usersLocations.push(locations);
            });
        });
      });
  }

}
