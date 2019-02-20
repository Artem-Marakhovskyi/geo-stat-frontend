import { Injectable } from '@angular/core';
import { LocalDataService } from './local-data.service';
import { Location } from 'src/app/models/location';
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

  public async getLocationsForUserFromDate(interval: FilterInterval) {
    const currentIntervalForUser = this.localDataService.getLocationsLoadIntervalForUser();

    if (interval > currentIntervalForUser || currentIntervalForUser === FilterInterval.None) {
      this.localDataService.setLocationsLoadIntervalForUser(interval);
      this.localDataService.setUserLocationsUpdateDate();

      return await new Promise<Location[]>(resolve => {
        this.locationService.getLocationsForUserFromDate(
          this.dateService.getDateBeforeInterval(interval),
          this.localDataService.getUserId())
          .subscribe(data => {
            this.localDataService.setLocationsForUser(data);
            resolve(data);
          });
      });
    }

    const lastUpdate = this.localDataService.getUserLocationsUpdateDate();

    if (this.dateService.isDateTimeValid(lastUpdate) && currentIntervalForUser >= interval) {
      return this.filterService.fillterByPeriodForUser(this.localDataService.getLocationsForUser(), interval);
    }
  }

  public async getLocationsForGroup(users: GeoStatUser[], groupId: string, interval: FilterInterval) {
    const currentIntervalForGroup = this.localDataService.getLocationsLoadIntervalForGroup(groupId);

    if (interval > currentIntervalForGroup || currentIntervalForGroup === FilterInterval.None) {
      return await new Promise<Location[][]>(resolve => {
        const usersLocations = new Array<Location[]>(0);
        this.localDataService.setLocationsLoadIntervalForGroup(groupId, interval);
        this.localDataService.setLocationsLastUpdateForGroup(groupId);

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

    const lastUpdate = this.localDataService.getLocationsLastUpdateForGroup(groupId);

    if (this.dateService.isDateTimeValid(lastUpdate) && currentIntervalForGroup >= interval) {
      return this.filterService.fillterByPeriodForGroup(this.localDataService.getLocationsForGroup(groupId), interval);
    }
  }

}
