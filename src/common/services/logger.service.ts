import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private logger: NGXLogger) { }

  public debug(logText: string) {
    this.logger.debug(logText);
  }

  public error(logText: string) {
    this.logger.error(logText);
  }

  public fatal(logText: string) {
    this.logger.fatal(logText);
  }

  public info(logText: string) {
    this.logger.info(logText);
  }

  public trace(logText: string) {
    this.logger.trace(logText);
  }

}
