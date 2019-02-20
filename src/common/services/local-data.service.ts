import { Injectable } from '@angular/core';
import { Location } from 'src/app/models/location';
import { FilterInterval } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor() { }

  public setUserLocationsForWeekUpdateDate() {
    localStorage.setItem('userLocationsForWeekUpdate', new Date().toString());
  }

  public getUserLocationsForWeekUpdateDate(): Date {
    return new Date(Date.parse(localStorage.getItem('userLocationsForWeekUpdate')));
  }

  public setUserLocationsUpdateDate() {
    localStorage.setItem('userLocationsUpdate', new Date().toString());
  }

  public getUserLocationsUpdateDate(): Date {
    return new Date(Date.parse(localStorage.getItem('userLocationsUpdate')));
  }

  public setLocationsForGroup(groupId: string, locations: Location[][]) {
    localStorage.setItem('locationsForGroup' + groupId, JSON.stringify(locations));
  }

  public getLocationsForGroup(groupId: string): Location[][] {
    return JSON.parse(localStorage.getItem('locationsForGroup' + groupId));
  }

  public setLocationsLastUpdateForGroup(groupId: string) {
    localStorage.setItem('locationsLastUpdateForGroup' + groupId, new Date().toString());
  }

  public getLocationsLastUpdateForGroup(groupId: string): Date {
    return new Date(Date.parse(localStorage.getItem('locationsLastUpdateForGroup' + groupId)));
  }

  public setLocationsLoadIntervalForGroup(groupId: string, interval: FilterInterval) {
    localStorage.setItem('locationsIntervalForGroup' + groupId, interval.toString());
  }

  public getLocationsLoadIntervalForGroup(groupId: string): FilterInterval {
    switch (Number.parseInt(localStorage.getItem('locationsIntervalForGroup' + groupId))) {
      case 1:
        return FilterInterval.Day;
      case 2:
        return FilterInterval.Week;
      case 3:
        return FilterInterval.Month;
      case 4:
        return FilterInterval.AllTime;
      default:
        return FilterInterval.None;
    }
  }

  public setLocationsForUser(locations: Location[]) {
    localStorage.setItem('locations', JSON.stringify(locations));
  }

  public getLocationsForUser(): Location[] {
    return JSON.parse(localStorage.getItem('locations'));
  }

  public setToken(token: string) {
    localStorage.setItem('geostat-token', token);
  }

  public getToken(): string {
    return localStorage.getItem('geostat-token');
  }

  public setUserEmail(token: string) {
    localStorage.setItem('user-email', token);
  }

  public getUserEmail(): string {
    return localStorage.getItem('user-email');
  }

  public setUserId(token: string) {
    localStorage.setItem('user-id', token);
  }

  public getUserId(): string {
    return localStorage.getItem('user-id');
  }

  public removeAllData() {
    localStorage.removeItem('locations')
    localStorage.removeItem('locationsForGroup')
    localStorage.removeItem('geostat-token');
    localStorage.removeItem('user-email');
    localStorage.removeItem('user-id');
  }

}
