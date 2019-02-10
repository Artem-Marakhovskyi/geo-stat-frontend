import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/common/services/logger.service';
import { GroupUser } from '../models/groupUser';
import { Group } from '../models/group';
import { GeoStatUser } from '../models/geoStatUser';
import { GroupUsers } from '../models/groupUsers';
import { forkJoin } from 'rxjs';
import { GroupService } from 'src/common/services/group.service';
import { UserService } from 'src/common/services/user.service';
import { AccountService } from 'src/common/services/account.service';
import { MapType } from 'src/common/enums';
import { LocationService } from 'src/common/services/location.service';
import { Location } from '../models/location';

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
  private readonly type = MapType.Group;
  private usersForMap: GeoStatUser[];
  private usersLocationsForMap = new Array<Location[]>(0);
  private groupNameForMap: string;
  private mode = true;


  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private locationService: LocationService,
    private loggerService: LoggerService,
    private accountService: AccountService) { }

  public showMap(users: GeoStatUser[], groupName: string) {
    this.usersForMap = users;
    this.groupNameForMap = groupName;

    this.usersForMap.forEach(user => {
      this.locationService.getLocationsForUser(user.id)
        .subscribe((data: Location[]) => {
          this.usersLocationsForMap.push(data);
        })
    });

    this.mode = false;
  }

  public backToGroups() {
    this.mode = true;
  }

  ngOnInit() {
    this.userService.getUserByEmail(localStorage.getItem('email'))
      .toPromise()
      .then((user: GeoStatUser) => {
        forkJoin(
          this.groupService.getGroups(),
          this.userService.getUsers(),
          this.userService.getGroupUsers()
        ).subscribe(([groupsData, usersData, groupUsersData]) => {
          this.groups = groupsData;
          this.users = usersData;
          this.groupUsers = groupUsersData;


          this.groups.forEach(element => {
            const isNotEmptyGroup = this.groupUsers
              .some(gu => gu.groupId === element.id);

            if (isNotEmptyGroup) {
              const currentGroupUsers = this.users
                .filter(u => this.groupUsers
                  .some(gu => u.id === gu.userId && gu.groupId === element.id));

              console.log(element.creatorId);
              element.creatorName = this.users.find(u => u.id === element.creatorId).email;

              this.groupsWithUsers.push(new GroupUsers(
                element.id,
                element.label,
                element.creatorId,
                element.creatorName,
                currentGroupUsers
              ));
            }
          });
        });
      })

  }

}
