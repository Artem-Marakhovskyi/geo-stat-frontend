import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoggerService } from 'src/common/services/logger.service';
import { HttpService } from 'src/common/services/http.service';
import { User } from '../models/user';
var LoginFormComponent = /** @class */ (function () {
    function LoginFormComponent(loggerService, httpService) {
        this.loggerService = loggerService;
        this.httpService = httpService;
        this.user = new User();
    }
    LoginFormComponent.prototype.submit = function (user) {
        var _this = this;
        this.httpService.postUser(user)
            .subscribe(function (data) { _this.receivedUser = data; }, function (error) { return _this.loggerService.error(error); });
    };
    LoginFormComponent.prototype.ngOnInit = function () {
    };
    LoginFormComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login-form',
            templateUrl: './login-form.component.html',
            styleUrls: ['./login-form.component.css'],
            providers: [LoggerService, HttpService]
        }),
        tslib_1.__metadata("design:paramtypes", [LoggerService, HttpService])
    ], LoginFormComponent);
    return LoginFormComponent;
}());
export { LoginFormComponent };
//# sourceMappingURL=login-form.component.js.map