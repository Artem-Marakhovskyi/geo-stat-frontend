import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocationService } from 'src/common/services/location.service';
import { Location } from '../models/location';
import { MapConfiguration } from './map.configuration';
import { UserService } from 'src/common/services/user.service';
import { GroupService } from 'src/common/services/group.service';
import { GeoStatUser } from '../models/geoStatUser';
import { MapType, FilterInterval } from 'src/common/enums';
import { DateService } from 'src/common/services/date.service';
import { LocationsFilterService } from 'src/common/services/locations-filter.service';
import { LocalDataService } from 'src/common/services/local-data.service';

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
    private filterService: LocationsFilterService,
    private localDataService: LocalDataService,
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
      this.userLocations = this.localDataService.getLocationsForUser();

      if (this.currentFilterPeriod > this.loadedFilterPeriod) {
        this.getAllLocations(true);
        this.currentFilterPeriod = FilterInterval.AllTime;
        this.loadedFilterPeriod = FilterInterval.AllTime;
      }

      switch (this.dateFilter) {
        case 'day':
          this.userLocations = this.filterService.fillterByPeriodForUser(this.userLocations, FilterInterval.Day);
          break;
        case 'week':
          this.userLocations = this.filterService.fillterByPeriodForUser(this.userLocations, FilterInterval.Week);
          break;
        case 'month':
          this.userLocations = this.filterService.fillterByPeriodForUser(this.userLocations, FilterInterval.Month);
          break;
        default:
          break;
      }
    }

    if (this.type === MapType.Group) {
      this.usersLocations = this.localDataService.getLocationsForGroup();

      if (this.currentFilterPeriod > this.loadedFilterPeriod) {
        this.getAllLocations(true);
        this.currentFilterPeriod = FilterInterval.AllTime;
        this.loadedFilterPeriod = FilterInterval.AllTime;
      }

      switch (this.dateFilter) {
        case 'day':
          this.usersLocations = this.filterService.fillterByPeriodForGroup(this.usersLocations, FilterInterval.Day);
          break;
        case 'week':
          this.usersLocations = this.filterService.fillterByPeriodForGroup(this.usersLocations, FilterInterval.Week);
          break;
        case 'month':
          this.usersLocations = this.filterService.fillterByPeriodForGroup(this.usersLocations, FilterInterval.Month);
          break;
        default:
          break;
      }
    }
  }

  
}
