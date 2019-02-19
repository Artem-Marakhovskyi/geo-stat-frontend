import { Injectable } from '@angular/core';
import { LocalDataService } from './local-data.service';
import { Location } from 'src/app/models/location';
import { Observable } from 'rxjs';
import { LocationService } from './location.service';
import { DateService } from './date.service';
import { LocationsFilterService } from './locations-filter.service';
import { FilterInterval } from '../enums';

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
}
