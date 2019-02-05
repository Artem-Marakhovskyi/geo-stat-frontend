import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/common/services/logger.service';
import { HttpService } from 'src/common/services/http.service';
import { User } from '../models/user';
import { AccountService } from 'src/common/services/account.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [LoggerService, HttpService]
})
export class LoginFormComponent implements OnInit {
  private user: User = new User();
  private receivedUser: User;

  constructor(
    private logger: LoggerService,
    private account: AccountService) { }

  public submit(user: User) {
    this.account.logIn();
    // this.httpService.postUser(user)
    //   .subscribe(
    //     (data: User) => { this.receivedUser = data; },
    //     error => this.loggerService.error(error)
    //   );

  }

  ngOnInit() {
  }

}
