import { Injectable } from '@angular/core';
import { FilterInterval } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public getDateOneDayBefore() {
    let date = new Date();

    return new Date(date.setDate(date.getDate() - 1));
  }

  public getDateOneWeekBefore() {
    let date = new Date();

    return new Date(date.setDate(date.getDate() - 7));
  }

  public getDateOneMonthBefore() {
    let date = new Date();

    return new Date(date.setMonth(date.getMonth() - 1));
  }

  public getStringFromDate(date: Date) {
    return date.getFullYear().toString() + '-' + date.getMonth().toString() + '-' + date.getDate().toString();
  }

  public setFilterPeriod(period: string) {
    switch (period) {
      case 'day':
        return FilterInterval.Day;
      case 'week':
        return FilterInterval.Week;
      case 'month':
        return FilterInterval.Month;
      default:
        return FilterInterval.AllTime;
    }
  }

}
