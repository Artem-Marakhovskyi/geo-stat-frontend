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

  constructor(private loggerService: LoggerService, private httpService: HttpService) { }

  user: User = new User();
  receivedUser: User;

  submit(user: User) {

    this.httpService.postData(user)
      .subscribe(
        (data: User) => { this.receivedUser = data; },
        error => this.loggerService.error(error)
      );

  }

  ngOnInit() {
  }

}
