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
  @Input() private groupId: string;
  @Input() private type: MapType;
  @Output() private onFilterChange = new EventEmitter<FilterInterval>();
  private readonly groupType = MapType.Group;
  private currentFilterPeriod = this.mapConfiguration.filterInterval;
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

  private getAllLocations(increased: FilterInterval) {
    this.onFilterChange.emit(increased);
  }

  private changeFilter() {
    this.currentFilterPeriod = this.dateService.setFilterPeriod(this.dateFilter);

    if (this.type === MapType.Personal) {
      this.getAllLocations(this.currentFilterPeriod);
    }

    if (this.type === MapType.Group) {
      this.usersLocations = this.localDataService.getLocationsForGroup(this.groupId);
      this.getAllLocations(this.currentFilterPeriod);
    }
  }

}
