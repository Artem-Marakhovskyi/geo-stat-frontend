import { Component } from '@angular/core';
import { LoggerService } from 'src/common/services/logger.service';
import { HttpService } from 'src/common/services/http.service'
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoggerService, HttpService]
})
export class AppComponent {
  title = 'geo-stat';

  constructor(private loggerService: LoggerService, private httpService: HttpService) {
    this.loggerService.debug('Your log message goes here');
  }

  user: User = new User();
  receivedUser: User;

  submit(user: User) {

    if (user.password == user.password) {
      
      this.httpService.postData(user)
        .subscribe(
          (data: User) => { this.receivedUser = data; },
          error => this.loggerService.error (error)
        );
    }
  }
}
