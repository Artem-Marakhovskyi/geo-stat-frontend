import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Location } from 'src/app/models/location';
import { Group } from 'src/app/models/group';
import { Observable } from 'rxjs/observable';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly getLocationsURL = 'http://geostat-app.azurewebsites.net/tables/Location';
  private readonly getGroupsURL = 'http://geostat-app.azurewebsites.net/tables/Group';

  public constructor(private http: HttpClient) { }

  public postUser(user: User) {
    return this.http.post('', user);
  }

  public getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.getLocationsURL);
  }

  public getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.getGroupsURL);
  }
}
