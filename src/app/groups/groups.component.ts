import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/common/services/logger.service';
import { HttpService } from 'src/common/services/http.service';
import { Group } from '../models/group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  private myGroups: Group[];

  public constructor(private loggerService: LoggerService, private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getGroups().subscribe(
      (result: Group[]) => {
        this.myGroups = result;
      });
  }

}
