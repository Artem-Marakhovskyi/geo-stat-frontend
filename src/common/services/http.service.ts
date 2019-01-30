import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Location } from 'src/app/models/location';
import { Group } from 'src/app/models/group';
import { GroupUser } from 'src/app/models/groupUser';
import { GeoStatUser } from 'src/app/models/geoStatUser';
import { Observable } from 'rxjs/observable';
import { UrlContaner } from '../url.contaner';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public get<T>(url: String): Observable<T> {
    return this.http.get<T>(url.toString());
  }

}
