import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/common/services/logger.service';
import { GroupUser } from '../models/groupUser';
import { Group } from '../models/group';
import { GeoStatUser } from '../models/geoStatUser';
import { GroupUsers } from '../models/groupUsers';
import { forkJoin } from 'rxjs';
import { GroupService } from 'src/common/services/group.service';
import { UserService } from 'src/common/services/user.service';

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
    private groupService: GroupService,
    private userService: UserService,
    private loggerService: LoggerService) { }

  ngOnInit() {
    forkJoin(
      this.groupService.getGroups(),
      this.userService.getUsers(),
      this.userService.getGroupUsers()
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
