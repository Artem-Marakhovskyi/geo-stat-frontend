import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, forkJoin } from 'rxjs';
import { UrlContaner } from '../url.contaner';
import { LoggerService } from './logger.service';
import { Location } from '../../app/models/location';
import { Group } from 'src/app/models/group';
import { GroupUser } from 'src/app/models/groupUser';

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

  // public getLocationsForGroup(): Location[] {
  //   let groupUsers: GroupUser[];
  //   let locations: Location[];
  //   let groupId = 'ff3a9e6d58f7474ca11451ecb32a93c5';

  //   forkJoin(
  //     this.http.get<GroupUser[]>(UrlContaner.getGroupUsersURL),
  //     this.http.get<Location[]>(UrlContaner.getLocationsURL)
  //   ).subscribe(([groupUsersData, locationsData]) => {
  //     groupUsers = groupUsersData.filter(gu => gu.groupId === groupId);
  //     locations = locationsData.filter(ld => groupUsers.some(gu => gu.userId === ld.userId));
  //     //console.log(locations);
  //   });

  //   return locations;
  // }

}
