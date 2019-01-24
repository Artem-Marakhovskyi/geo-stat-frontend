import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/common/services/logger.service';
import { HttpService } from 'src/common/services/http.service';
import { GroupUser } from '../models/groupUser';
import { Group } from '../models/group';
import { GeoStatUser } from '../models/geoStatUser';
import { GroupUsers } from '../models/groupUsers';
import { Observable, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit {
  private groupsWithUsers: GroupUsers[] = new Array(0);
  private groups: Group[];
  private users: GeoStatUser[];
  private groupUsers: GroupUser[];

  constructor(
    private loggerService: LoggerService,
    private httpService: HttpService) { }

  ngOnInit() {
    forkJoin(
      this.httpService.getGroups(),
      this.httpService.getUsers(),
      this.httpService.getGroupUsers()
    ).subscribe(([groupsData, usersData, groupUsersData]) => {
      this.groups = groupsData;
      this.users = usersData;
      this.groupUsers = groupUsersData;

      this.groups.forEach(element => {
        const isNotEmptyGroup = this.groupUsers.some(gu => gu.groupId === element.id);

        if (isNotEmptyGroup) {
          const currentGroupUsers = this.users.filter(u => this.groupUsers.some(gu => u.id === gu.userId && gu.groupId === element.id));

          this.groupsWithUsers.push(new GroupUsers(
            element.id,
            element.label,
            element.creatorId,
            currentGroupUsers
          ));
        }
      });
    });
  }

}
