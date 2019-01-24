import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Location } from 'src/app/models/location';
import { Group } from 'src/app/models/group';
import { GroupUser } from 'src/app/models/groupUser';
import { GeoStatUser } from 'src/app/models/geoStatUser';
import { Observable } from 'rxjs/observable';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly commonURL = 'http://geostat-app.azurewebsites.net';
  private readonly getLocationsURL = this.commonURL + '/tables/Location';
  private readonly getGroupsURL = this.commonURL + '/tables/Group';
  private readonly getGroupUsersURL = this.commonURL + '/tables/GroupUser';
  private readonly getUsersURL = this.commonURL + '/tables/GeoStatUser';

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

  public getGroupUsers(): Observable<GroupUser[]> {
    return this.http.get<GroupUser[]>(this.getGroupUsersURL);
  }

  public getUsers(): Observable<GeoStatUser[]> {
    return this.http.get<GeoStatUser[]>(this.getUsersURL);
  }

}
