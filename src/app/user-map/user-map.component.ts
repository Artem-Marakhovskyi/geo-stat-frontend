import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/common/services/location.service';
import { Location } from '../models/location';
import { AccountService } from 'src/common/services/account.service';
import { MapType, FilterInterval } from 'src/common/enums';
import { UserService } from 'src/common/services/user.service';
import { DateService } from 'src/common/services/date.service';
import { LocalDataService } from 'src/common/services/local-data.service';
import { DataProviderService } from 'src/common/services/data-provider.service';

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
    private localDataService: LocalDataService,
    private dataProvider: DataProviderService,
    private dateService: DateService) { }

  ngOnInit() {
    this.dataProvider.getLocationsForUserFromDate(FilterInterval.Week)
      .then(locations => {
        this.userLocations = locations;
      });
    // this.locationService.getLocationsForUserFromDate(this.dateService.getDateOneWeekBefore(), this.accountService.getUserId())
    //   .subscribe(data => {
    //     this.userLocations = data;
    //     this.localDataService.setLocationsForUser(data);
    //   });
  }

  private onFilterChange(increased: any) {
    this.dataProvider.getLocationsForUser()
      .then(locations => {
        this.userLocations = locations;
      });
  }

}
