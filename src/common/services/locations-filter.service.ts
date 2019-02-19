import { Injectable } from '@angular/core';
import { FilterInterval } from '../enums';
import { DateService } from './date.service';
import { Location } from 'src/app/models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationsFilterService {

  constructor(private dateService: DateService) { }

  public fillterByPeriodForUser(locations: Location[], period: FilterInterval): Location[] {
    let currentDate = new Date();
    let filterDate: number;

    switch (period) {
      case FilterInterval.Day:
        filterDate = this.dateService.getDateOneDayBefore().valueOf();
        break;
      case FilterInterval.Week:
        filterDate = this.dateService.getDateOneWeekBefore().valueOf();
        break;
      case FilterInterval.Month:
        filterDate = this.dateService.getDateOneMonthBefore().valueOf();
        break;
      default:
        return locations;
    }

    return locations.filter((location: Location) =>
      new Date(location.dateTime).valueOf() > filterDate.valueOf()
    );
  }

  public fillterByPeriodForGroup(locations: Location[][], period: FilterInterval): Location[][] {
    let currentDate = new Date();
    let filterDate: number;
    let resultLocations: Location[][] = new Array<Location[]>(0);

    switch (period) {
      case FilterInterval.Day:
        filterDate = this.dateService.getDateOneDayBefore().valueOf();
        break;
      case FilterInterval.Week:
        filterDate = this.dateService.getDateOneWeekBefore().valueOf();
        break;
      case FilterInterval.Month:
        filterDate = this.dateService.getDateOneMonthBefore().valueOf();
        break;
      default:
        return locations;
    }

    locations.forEach(element => {
      resultLocations.push(element.filter((location: Location) =>
        new Date(location.dateTime).valueOf() > filterDate.valueOf()
      ))
    });

    return resultLocations;
  }

}
