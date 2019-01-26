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
  private userLocations: Location[];
  private userId = 'f46b7a360f634909989eac5e3a0bdbe3';

  constructor(
    private locationService: LocationService,
    private userService: UserService,
    private mapConfiguration: MapConfiguration) { }

  ngOnInit() {
    // this.locationService.getLocations()
    //   .subscribe((result: Location[]) => {
    //     this.userLocations = result.filter(l => l.userId === this.userId);
    //   });

    let groupUsers: GroupUser[];
    let locations: Location[];
    let groupId = 'ff3a9e6d58f7474ca11451ecb32a93c5';

    forkJoin(
      this.userService.getGroupUsers(),
      this.locationService.getLocations()
    ).subscribe(([groupUsersData, locationsData]) => {
      groupUsers = groupUsersData.filter(gu => gu.groupId === groupId);
      locations = locationsData.filter(ld => groupUsers.some(gu => gu.userId === ld.userId));
      console.log(locations);
      this.userLocations = locations;
    });
  }

}
