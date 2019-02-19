import { Injectable } from '@angular/core';
import { Location } from 'src/app/models/location';

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

  public setLocationsForGroup(locations: Location[][]) {
    localStorage.setItem('locationsForGroup', JSON.stringify(locations));
  }

  public getLocationsForGroup(): Location[][] {
    return JSON.parse(localStorage.getItem('locationsForGroup'));
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
