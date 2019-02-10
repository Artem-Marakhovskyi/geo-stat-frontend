import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, forkJoin } from 'rxjs';
import { UrlContaner } from '../url.contaner';
import { LoggerService } from './logger.service';
import { Location } from '../../app/models/location';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpService,
    private logger: LoggerService) { }

  public getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(UrlContaner.getLocationsURL);
  }

  public getLocationsForUser(userId: string): Observable<Location[]> {
    return this.http.get<Location[]>(UrlContaner.getLocationsForUserURL(userId));
  }

}
