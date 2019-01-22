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

  private getLocationsURL = 'http://geostat-app.azurewebsites.net/tables/Location';
  private getGroupsURL = 'http://geostat-app.azurewebsites.net/tables/Group';

  constructor(private http: HttpClient) { }

  postUser(user: User) {
    return this.http.post('', user);
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.getLocationsURL);
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.getGroupsURL);
  }
}
