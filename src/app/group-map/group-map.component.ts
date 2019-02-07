import { Component, OnInit } from '@angular/core';
import { GeoStatUser } from '../models/geoStatUser';
import { UserService } from 'src/common/services/user.service';
import { GroupService } from 'src/common/services/group.service';
import { LocationService } from 'src/common/services/location.service';
import { Location } from '../models/location';
import { MapType } from 'src/common/enums';
import { AccountService } from 'src/common/services/account.service';

@Component({
  selector: 'app-group-map',
  templateUrl: './group-map.component.html',
  styleUrls: ['./group-map.component.css']
})
export class GroupMapComponent implements OnInit {
  private usersLocations = new Array<Location[]>(0);
  private users: GeoStatUser[];
  private groupName: String;
  private type = MapType.Group;

  constructor(
    private locationService: LocationService,
    private userService: UserService,
    private groupService: GroupService,
    private accountService: AccountService) { }

  ngOnInit() {
    if (!this.accountService.isAuthorized()) {
      this.accountService.redirectToLogin();
    }

    this.groupName = 'First group';

    this.usersLocations.push([
      new Location(49.995245, 36.233340, new Date(), "1", "1"),
      new Location(49.998035, 36.227419, new Date(), "1", "2"),
    ]);

    this.usersLocations.push([
      new Location(49.992408, 36.211883, new Date(), "2", "3"),
    ]);

    this.usersLocations.push([
      new Location(49.998563, 36.224844, new Date(), "3", "4"),
    ]);

    this.usersLocations.push([
      new Location(50.000307, 36.236948, new Date(), "4", "5"),
    ]);

    this.users = [
      new GeoStatUser("user1@aaa.aa", "1"),
      new GeoStatUser("user2@aaa.aa", "2"),
      new GeoStatUser("user3@aaa.aa", "3"),
      new GeoStatUser("user4@aaa.aa", "4"),
      new GeoStatUser("user5@aaa.aa", "5"),
      new GeoStatUser("user6@aaa.aa", "6"),
      new GeoStatUser("user7@aaa.aa", "7")
    ];
  }

}
