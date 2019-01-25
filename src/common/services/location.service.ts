import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { UrlContaner } from '../url.contaner';
import { LoggerService } from './logger.service';
import { Location } from '../../app/models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public constructor(
    private http: HttpService,
    private logger: LoggerService) { }

  public getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(UrlContaner.getLocationsURL);
  }

}
