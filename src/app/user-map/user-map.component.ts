import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/common/services/location.service';
import { Location } from '../models/location';
import { AccountService } from 'src/common/services/account.service';
import { MapType } from 'src/common/enums';
import { UserService } from 'src/common/services/user.service';
import { GeoStatUser } from '../models/geoStatUser';

@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.css']
})
export class UserMapComponent implements OnInit {
  private userLocations = new Array<Location>(0);
  private type = MapType.Personal;

  constructor(
    private locationService: LocationService,
    private userService: UserService,
    private accountService: AccountService) { }

  ngOnInit() {
    if (!this.accountService.isAuthorized()) {
      this.accountService.redirectToLogin();
    }

    this.userService.getUserByEmail(localStorage.getItem('email'))
      .toPromise()
      .then((user: GeoStatUser) => {
        this.locationService.getLocationsForUser(user[0].id)
          .subscribe(data => {
            this.userLocations = data;
          });
      });

  }

}
