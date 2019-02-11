import { Component, OnInit, Input } from '@angular/core';
import { LocationService } from 'src/common/services/location.service';
import { Location } from '../models/location';
import { MapConfiguration } from './map.configuration';
import { UserService } from 'src/common/services/user.service';
import { GroupService } from 'src/common/services/group.service';
import { GeoStatUser } from '../models/geoStatUser';
import { MapType } from 'src/common/enums';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() private usersLocations = new Array<Location[]>(0);
  @Input() private users: GeoStatUser[];
  @Input() private groupName: string;
  @Input() private type: MapType;
  private readonly groupType = MapType.Group;
  private index = 0;
  private dateFilter = 'month';

  constructor(
    private locationService: LocationService,
    private userService: UserService,
    private groupService: GroupService,
    private mapConfiguration: MapConfiguration) { }

  ngOnInit() {
    localStorage.setItem('locations', JSON.stringify(this.usersLocations));

    if (this.type === MapType.Group) {
      this.mapConfiguration.shuffleColors();
    }
  }

  private onChange() {
    let date = new Date();
    this.usersLocations = JSON.parse(localStorage.getItem('locations'));

    switch (this.dateFilter) {
      case 'day':
        console.log(this.usersLocations);

        this.usersLocations.forEach((userLocations: Location[]) => {
          userLocations.filter((location: Location) => {
            let currentDate = date.getDate();
            location.dateTime.valueOf() > date.setDate(currentDate - 1).valueOf()
          })
        });
        break;
      case 'week':

        break;
      case 'month':

        break;
      case 'allTime':

        break;
      default:
        break;
    }
  }

  private getStyles() {
    let myStyles = {
      'width': this.type === MapType.Group ? '71vw' : '97vw',
      'float': this.type === MapType.Group ? 'right' : 'left'
    };

    return myStyles;
  }

}
