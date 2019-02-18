import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocationService } from 'src/common/services/location.service';
import { Location } from '../models/location';
import { MapConfiguration } from './map.configuration';
import { UserService } from 'src/common/services/user.service';
import { GroupService } from 'src/common/services/group.service';
import { GeoStatUser } from '../models/geoStatUser';
import { MapType, FilterInterval } from 'src/common/enums';
import { DateService } from 'src/common/services/date.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() private usersLocations: Array<Location[]>;
  @Input() private userLocations: Array<Location>;
  @Input() private users: GeoStatUser[];
  @Input() private groupName: string;
  @Input() private type: MapType;
  @Output() private onFilterChange = new EventEmitter<boolean>();
  private readonly groupType = MapType.Group;
  private currentFilterPeriod = this.mapConfiguration.filterInterval;
  private loadedFilterPeriod = this.mapConfiguration.filterInterval;
  private dateFilter = this.mapConfiguration.dateFilter;

  constructor(
    private locationService: LocationService,
    private userService: UserService,
    private groupService: GroupService,
    private mapConfiguration: MapConfiguration,
    private dateService: DateService) { }

  ngOnInit() {
    if (this.type === MapType.Group) {
      this.mapConfiguration.shuffleColors();
    }
  }

  private getAllLocations(increased: any) {
    this.onFilterChange.emit(increased);
  }

  private changeFilter() {
    this.currentFilterPeriod = this.dateService.setFilterPeriod(this.dateFilter);

    if (this.type === MapType.Personal) {
      this.userLocations = JSON.parse(localStorage.getItem('locations'));

      if (this.currentFilterPeriod > this.loadedFilterPeriod) {
        this.getAllLocations(true);
        this.currentFilterPeriod = FilterInterval.AllTime;
        this.loadedFilterPeriod = FilterInterval.AllTime;
      }

      switch (this.dateFilter) {
        case 'day':
          this.userLocations = this.fillterByPeriodForUser(this.userLocations, FilterInterval.Day);
          break;
        case 'week':
          this.userLocations = this.fillterByPeriodForUser(this.userLocations, FilterInterval.Week);
          break;
        case 'month':
          this.userLocations = this.fillterByPeriodForUser(this.userLocations, FilterInterval.Month);
          break;
        default:
          break;
      }
    }

    if (this.type === MapType.Group) {
      this.usersLocations = JSON.parse(localStorage.getItem('locationsForGroup'));

      if (this.currentFilterPeriod > this.loadedFilterPeriod) {
        this.getAllLocations(true);
        this.currentFilterPeriod = FilterInterval.AllTime;
        this.loadedFilterPeriod = FilterInterval.AllTime;
      }

      switch (this.dateFilter) {
        case 'day':
          this.usersLocations = this.fillterByPeriodForGroup(this.usersLocations, FilterInterval.Day);
          break;
        case 'week':
          this.usersLocations = this.fillterByPeriodForGroup(this.usersLocations, FilterInterval.Week);
          break;
        case 'month':
          this.usersLocations = this.fillterByPeriodForGroup(this.usersLocations, FilterInterval.Month);
          break;
        default:
          break;
      }
    }
  }

  private fillterByPeriodForUser(locations: Location[], period: FilterInterval): Location[] {
    let currentDate = new Date();
    let filterDate: number;

    switch (period) {
      case FilterInterval.Day:
        filterDate = this.dateService.getDateOneDayBefore().valueOf();
        break;
      case FilterInterval.Week:
        filterDate = this.dateService.getDateOneWeekBefore().valueOf();
        break;
      case FilterInterval.Month:
        filterDate = this.dateService.getDateOneMonthBefore().valueOf();
        break;
      default:
        return locations;
    }

    return locations.filter((location: Location) =>
      new Date(location.dateTime).valueOf() > filterDate.valueOf()
    );
  }

  private fillterByPeriodForGroup(locations: Location[][], period: FilterInterval): Location[][] {
    let currentDate = new Date();
    let filterDate: number;
    let resultLocations: Location[][] = new Array<Location[]>(0);

    switch (period) {
      case FilterInterval.Day:
        filterDate = this.dateService.getDateOneDayBefore().valueOf();
        break;
      case FilterInterval.Week:
        filterDate = this.dateService.getDateOneWeekBefore().valueOf();
        break;
      case FilterInterval.Month:
        filterDate = this.dateService.getDateOneMonthBefore().valueOf();
        break;
      default:
        return locations;
    }

    locations.forEach(element => {
      resultLocations.push(element.filter((location: Location) =>
        new Date(location.dateTime).valueOf() > filterDate.valueOf()
      ))
    });

    console.log(resultLocations)

    return resultLocations;
  }

}
