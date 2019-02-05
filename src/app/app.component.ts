import { Component, OnInit, DoCheck } from '@angular/core';
import { LoggerService } from 'src/common/services/logger.service';
import { AccountService } from 'src/common/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  private title = 'geo-stat';
  public isAuthorized: boolean;

  constructor(
    private logger: LoggerService,
    private account: AccountService) { }

  ngOnInit() {
    this.isAuthorized = this.account.isAuthorized();
  }

  ngDoCheck() {
    this.isAuthorized = this.account.isAuthorized();
  }

}
