import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoggerService } from 'src/common/services/logger.service';
import { HttpService } from 'src/common/services/http.service';
import { User } from '../models/user';
import { Location } from '../models/location';
var RegistrationFormComponent = /** @class */ (function () {
    function RegistrationFormComponent(loggerService, httpService) {
        this.loggerService = loggerService;
        this.httpService = httpService;
        this.user = new User();
        this.loggerService.debug('Your log message goes here');
    }
    RegistrationFormComponent.prototype.submit = function (user) {
        var _this = this;
        if (user.password === user.passwordRepeat) {
            this.httpService.postUser(user)
                .subscribe(function (response) { }, function (error) { return _this.loggerService.error(error); });
        }
    };
    RegistrationFormComponent.prototype.ngOnInit = function () {
        var locations;
        this.httpService.getLocations().subscribe(function (data) { return locations = data; });
        for (var index = 0; index < locations.length; index++) {
            var currentLocation = locations[index];
            this.locationsDTO[index] = new Location(currentLocation.Latitude, currentLocation.Longitude, currentLocation.DateTime, currentLocation.UserId, currentLocation.Id);
        }
    };
    RegistrationFormComponent = tslib_1.__decorate([
        Component({
            selector: 'app-registration-form',
            templateUrl: './registration-form.component.html',
            styleUrls: ['./registration-form.component.css'],
            providers: [LoggerService, HttpService]
        }),
        tslib_1.__metadata("design:paramtypes", [LoggerService, HttpService])
    ], RegistrationFormComponent);
    return RegistrationFormComponent;
}());
export { RegistrationFormComponent };
//# sourceMappingURL=registration-form.component.js.map