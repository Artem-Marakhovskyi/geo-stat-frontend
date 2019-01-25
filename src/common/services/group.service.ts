import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlContaner } from '../url.contaner';
import { HttpService } from './http.service';
import { LoggerService } from './logger.service';
import { Group } from 'src/app/models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpService,
    private logger: LoggerService) { }

  public getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(UrlContaner.getGroupsURL);
  }

}
