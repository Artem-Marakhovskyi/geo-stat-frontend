import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/common/services/http.service';
import { LoggerService } from 'src/common/services/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'geo-stat';

  constructor(private loggerService: LoggerService, private httpService: HttpService) { }

  ngOnInit() { }
}
