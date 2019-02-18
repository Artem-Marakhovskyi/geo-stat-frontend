import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/common/services/logger.service';
import { GroupUser } from '../models/groupUser';
import { Group } from '../models/group';
import { GeoStatUser } from '../models/geoStatUser';
import { GroupUsers } from '../models/groupUsers';
import { forkJoin, Observable } from 'rxjs';
import { GroupService } from 'src/common/services/group.service';
import { UserService } from 'src/common/services/user.service';
import { AccountService } from 'src/common/services/account.service';
import { MapType } from 'src/common/enums';
import { LocationService } from 'src/common/services/location.service';
import { Location } from '../models/location';
import { DateService } from 'src/common/services/date.service';

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
  private index = 0;
  // private promises = new Array();


  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private locationService: LocationService,
    private loggerService: LoggerService,
    private accountService: AccountService,
    private dateService: DateService) { }

  public showMap(users: GeoStatUser[], groupName: string) {
    this.usersForMap = users;
    this.groupNameForMap = groupName;
    // localStorage.setItem('currentGroupUsers', JSON.stringify(users));

    Promise.all(this.getLocationsForUsers(users))
      .then(res => {
        // localStorage.setItem('locationsForGroup', JSON.stringify(this.usersLocationsForMap));
      })


    this.mode = false;
  }

  getLocationsForUsers(users: GeoStatUser[]) {
    let promises = new Array();
    this.usersLocationsForMap = new Array<Location[]>(0);

    users.forEach(user => {
      promises.push(this.locationService.getLocationsForUserFromDate(this.dateService.getDateOneWeekBefore(), user.id)
        .subscribe(locations => {
          this.usersLocationsForMap.push(locations);
          localStorage.setItem('locationsForGroup', JSON.stringify(this.usersLocationsForMap));
        }));
    });

    return promises;
  }

  private onFilterChange(increased: any) {
    this.usersLocationsForMap = this.usersLocationsForMap.slice(0, 0);
    this.usersForMap.forEach(user => {
      this.locationService.getLocationsForUser(user.id)
        .subscribe((data: Location[]) => {
          this.usersLocationsForMap.push(data);
          localStorage.setItem('locationsForGroup', JSON.stringify(this.usersLocationsForMap));
        })
    });
  }

  public backToGroups() {
    this.mode = true;
  }

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
        const isNotEmptyGroup = this.groupUsers
          .some(gu => gu.groupId === element.id);

        if (isNotEmptyGroup) {
          const currentGroupUsers = this.users
            .filter(u => this.groupUsers
              .some(gu => u.id === gu.userId && gu.groupId === element.id));

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
  }

}
