import { Component, OnInit, Input } from '@angular/core';
import { LocationService } from 'src/common/services/location.service';
import { Location } from '../models/location';
import { MapConfiguration } from './map.configuration';
import { UserService } from 'src/common/services/user.service';
import { GroupService } from 'src/common/services/group.service';
import { GeoStatUser } from '../models/geoStatUser';
import { MapType } from 'src/common/enums';
import { FormGroup, FormControl } from '@angular/forms';

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
    if (this.type === MapType.Group) {
      this.mapConfiguration.shuffleColors();
    }
  }

  // private filter() {
  //   alert(this.dateFilter);
  // }

  private getStyles() {
    let myStyles = {
      'width': this.type === MapType.Group ? '71vw' : '97vw',
      'float': this.type === MapType.Group ? 'right' : 'left'
    };

    return myStyles;
  }

}
