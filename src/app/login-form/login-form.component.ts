import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/common/services/logger.service';
import { HttpService } from 'src/common/services/http.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [LoggerService, HttpService]
})
export class LoginFormComponent implements OnInit {

  private user: User = new User();
  private receivedUser: User;

  public constructor(
    private loggerService: LoggerService,
    private httpService: HttpService) { }

  public submit(user: User) {

    this.httpService.postUser(user)
      .subscribe(
        (data: User) => { this.receivedUser = data; },
        error => this.loggerService.error(error)
      );

  }

  ngOnInit() {
  }

}
