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
import { MapType, FilterInterval } from 'src/common/enums';
import { LocationService } from 'src/common/services/location.service';
import { Location } from '../models/location';
import { DateService } from 'src/common/services/date.service';
import { LocalDataService } from 'src/common/services/local-data.service';
import { DataProviderService } from 'src/common/services/data-provider.service';

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
  private groupIdForMap: string;
  private mode = true;
  private index = 0;


  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private locationService: LocationService,
    private loggerService: LoggerService,
    private accountService: AccountService,
    private localDataService: LocalDataService,
    private dataproviderService: DataProviderService,
    private dateService: DateService) { }

  public showMap(users: GeoStatUser[], groupName: string, groupId: string) {
    this.usersForMap = users;
    this.groupNameForMap = groupName;
    this.groupIdForMap = groupId;
    this.getLocationsForUsers(users, groupId, FilterInterval.Week);
    this.mode = false;
  }

  getLocationsForUsers(users: GeoStatUser[], groupId: string, interval: FilterInterval) {
    this.usersLocationsForMap = new Array<Location[]>(0);
    this.dataproviderService.getLocationsForGroup(users, groupId, interval)
      .then(result => {
        this.usersLocationsForMap = result;
      })

    // users.forEach(user => {
    //   this.locationService.getLocationsForUserFromDate(this.dateService.getDateOneWeekBefore(), user.id)
    //     .subscribe(locations => {
    //       this.usersLocationsForMap.push(locations);
    //       this.localDataService.setLocationsForGroup(this.groupNameForMap, this.usersLocationsForMap);
    //     });
    // });
  }

  private onFilterChange(increased: FilterInterval) {
    this.usersLocationsForMap = this.usersLocationsForMap.slice(0, 0);

    this.dataproviderService.getLocationsForGroup(this.usersForMap, this.groupIdForMap, increased)
      .then(result => {
        this.usersLocationsForMap = result;
      })
    // this.usersForMap.forEach(user => {
    //   this.locationService.getLocationsForUser(user.id)
    //     .subscribe((data: Location[]) => {
    //       this.usersLocationsForMap.push(data);
    //       this.localDataService.setLocationsForGroup(this.groupNameForMap, this.usersLocationsForMap);
    //     })
    // });
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
