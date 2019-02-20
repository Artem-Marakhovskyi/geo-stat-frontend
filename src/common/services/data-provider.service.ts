import { Injectable } from '@angular/core';
import { LocalDataService } from './local-data.service';
import { Location } from 'src/app/models/location';
import { Observable } from 'rxjs';
import { LocationService } from './location.service';
import { DateService } from './date.service';
import { LocationsFilterService } from './locations-filter.service';
import { FilterInterval } from '../enums';
import { GeoStatUser } from 'src/app/models/geoStatUser';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  constructor(
    private locationService: LocationService,
    private dateService: DateService,
    private filterService: LocationsFilterService,
    private localDataService: LocalDataService) { }

  public async getLocationsForUser() {
    let lastUpdate = this.localDataService.getUserLocationsUpdateDate();

    if (this.dateService.isDateTimeValid(lastUpdate)) {
      console.log('data from local')

      return this.localDataService.getLocationsForUser();
    } else {
      console.log('data from server')
      this.localDataService.setUserLocationsUpdateDate();

      return await new Promise<Location[]>(resolve => {
        this.locationService.getLocationsForUser(this.localDataService.getUserId())
          .subscribe(data => {
            this.localDataService.setLocationsForUser(data);
            resolve(data);
          });
      })
    }
  }

  public async getLocationsForUserFromDate(interval: FilterInterval) {
    if (interval > FilterInterval.Week) {
      return this.filterService.fillterByPeriodForUser(this.localDataService.getLocationsForUser(), interval);
    }

    let lastUpdate = this.localDataService.getUserLocationsUpdateDate();

    if (this.dateService.isDateTimeValid(lastUpdate)) {
      console.log('data from local')

      return this.filterService.fillterByPeriodForUser(this.localDataService.getLocationsForUser(), interval);
    } else {
      console.log('data from server')
      this.localDataService.setUserLocationsForWeekUpdateDate();

      return await new Promise<Location[]>(resolve => {
        this.locationService.getLocationsForUserFromDate(this.dateService.getDateBeforeInterval(interval), this.localDataService.getUserId())
          .subscribe(data => {
            this.localDataService.setLocationsForUser(data);
            resolve(data);
          });
      })
    }
  }

  public async getLocationsForGroup(users: GeoStatUser[], groupId: string, interval: FilterInterval) {
    let currentIntervalForGroup = this.localDataService.getLocationsLoadIntervalForGroup(groupId);

    if (interval > currentIntervalForGroup || currentIntervalForGroup === FilterInterval.None) {
      console.log('data')
      return await new Promise<Location[][]>(resolve => {
        let usersLocations = new Array<Location[]>(0);
        this.localDataService.setLocationsLoadIntervalForGroup(groupId, interval);

        users.forEach(user => {
          this.locationService.getLocationsForUserFromDate(this.dateService.getDateBeforeInterval(interval), user.id)
            .subscribe(data => {
              usersLocations.push(data);
              this.localDataService.setLocationsForGroup(groupId, usersLocations);
            });
        });

        resolve(usersLocations);
      });
    }

    let lastUpdate = this.localDataService.getLocationsLastUpdateForGroup(groupId);

    if (this.dateService.isDateTimeValid(lastUpdate) && currentIntervalForGroup >= interval) {
      console.log('data from local')

      return this.filterService.fillterByPeriodForGroup(this.localDataService.getLocationsForGroup(groupId), interval);
    } else {
      console.log('data from server')
      this.localDataService.setLocationsLastUpdateForGroup(groupId);

      return await new Promise<Location[][]>(resolve => {
        let usersLocations = new Array<Location[]>(0);

        users.forEach(user => {
          this.locationService.getLocationsForUserFromDate(this.dateService.getDateBeforeInterval(interval), user.id)
            .subscribe(data => {
              usersLocations.push(data);
              this.localDataService.setLocationsForGroup(groupId, usersLocations);
            });
        });

        resolve(usersLocations);
      });
    }
  }
}
