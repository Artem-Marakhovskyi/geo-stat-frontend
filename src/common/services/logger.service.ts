import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private logger: NGXLogger) { }

  debug(logText: string) {
    this.logger.debug(logText);
  }
  error(logText: string) {
    this.logger.error(logText);
  }
  fatal(logText: string) {
    this.logger.fatal(logText);
  }
  info(logText: string) {
    this.logger.info(logText);
  }
  trace(logText: string) {
    this.logger.trace(logText);
  }
}
