import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/common/services/logger.service';
import { Group } from '../models/group';
import { GroupService } from 'src/common/services/group.service';
import { AccountService } from 'src/common/services/account.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  private userGroups: Group[];

  constructor(
    private loggerService: LoggerService,
    private groupService: GroupService) { }

  ngOnInit() {
    this.groupService.getGroups().subscribe(
      (result: Group[]) => {
        this.userGroups = result;
      });
  }

}
