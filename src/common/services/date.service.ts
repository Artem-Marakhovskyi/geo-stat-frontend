import { Injectable } from '@angular/core';
import { FilterInterval } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private readonly timeIntervalForDataStoring = 5;

  constructor() { }

  public isDateTimeValid(dateTime: Date): boolean {
    return dateTime.setMinutes(dateTime.getMinutes() + this.timeIntervalForDataStoring).valueOf() > new Date().valueOf();
  }

  public getDateOneDayBefore() {
    const date = new Date();

    return new Date(date.setDate(date.getDate() - 1));
  }

  public getDateOneWeekBefore() {
    const date = new Date();

    return new Date(date.setDate(date.getDate() - 7));
  }

  public getDateOneMonthBefore() {
    const date = new Date();

    return new Date(date.setMonth(date.getMonth() - 1));
  }

  public getDateBeforeInterval(interval: FilterInterval) {
    const date = new Date();

    switch (interval) {
      case FilterInterval.Day:
        return this.getDateOneDayBefore();
      case FilterInterval.Week:
        return this.getDateOneWeekBefore();
      case FilterInterval.Month:
        return this.getDateOneMonthBefore();
      default:
        return new Date(date.setMonth(date.getMonth() - 100));
    }
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
