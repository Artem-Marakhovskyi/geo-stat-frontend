import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/common/services/location.service';
import { Location } from '../models/location';
import { AccountService } from 'src/common/services/account.service';
import { MapType } from 'src/common/enums';
import { UserService } from 'src/common/services/user.service';
import { DateService } from 'src/common/services/date.service';

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
    private accountService: AccountService,
    private dateService: DateService) { }

  ngOnInit() {
    this.locationService.getLocationsForUserFromDate(this.dateService.getDateOneWeekBefore(), localStorage.getItem('user-id'))
      .subscribe(data => {
        this.userLocations = data;
        localStorage.setItem('locations', JSON.stringify(data));
      });
  }

  private onFilterChange(increased: any) {
    this.locationService.getLocationsForUser(localStorage.getItem('user-id'))
      .subscribe(data => {
        this.userLocations = data;
        localStorage.setItem('locations', JSON.stringify(data));
      });
  }

}
