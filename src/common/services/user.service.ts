import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LoggerService } from './logger.service';
import { Observable } from 'rxjs';
import { UrlContaner } from '../url.contaner';
import { GroupUser } from 'src/app/models/groupUser';
import { GeoStatUser } from 'src/app/models/geoStatUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService,
    private logger: LoggerService) { }

  public getUsers(): Observable<GeoStatUser[]> {
    return this.http.get<GeoStatUser[]>(UrlContaner.getUsersURL);
  }

  public getGroupUsers(): Observable<GroupUser[]> {
    return this.http.get<GroupUser[]>(UrlContaner.getGroupUsersURL);
  }

  public getUsersForGroup(groupId: String): Observable<GroupUser[]> {
    return this.http.get<GroupUser[]>(UrlContaner.getUsersForGroupURL(groupId));
  }

}
