import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/common/services/logger.service';
import { HttpService } from 'src/common/services/http.service';
import { User } from '../models/user';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  providers: [LoggerService, HttpService]
})
export class RegistrationFormComponent implements OnInit {
  private passwordError;
  private user: User = new User();

  constructor(
    private loggerService: LoggerService,
    private httpService: HttpService) { }

  public submit(user: User) {
    if (user.password === user.passwordRepeat) {
      // this.httpService.postUser(user)
      //   .subscribe(
      //     response => { },
      //     error => this.loggerService.error(error)
      //   );
    } else {
      this.user.password = '';
      this.user.passwordRepeat = '';
      alert('Passwords are not equal!');
    }
  }

  ngOnInit() { }

}
