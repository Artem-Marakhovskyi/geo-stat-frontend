import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
var LoggerService = /** @class */ (function () {
    function LoggerService(logger) {
        this.logger = logger;
    }
    LoggerService.prototype.debug = function (logText) {
        this.logger.debug(logText);
    };
    LoggerService.prototype.error = function (logText) {
        this.logger.error(logText);
    };
    LoggerService.prototype.fatal = function (logText) {
        this.logger.fatal(logText);
    };
    LoggerService.prototype.info = function (logText) {
        this.logger.info(logText);
    };
    LoggerService.prototype.trace = function (logText) {
        this.logger.trace(logText);
    };
    LoggerService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [NGXLogger])
    ], LoggerService);
    return LoggerService;
}());
export { LoggerService };
//# sourceMappingURL=logger.service.js.map