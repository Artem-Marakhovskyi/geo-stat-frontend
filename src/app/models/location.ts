export class Location {
    latitude: Number;
    longitude: Number;
    dateTime: Date;
    userId: String;
    id: String;

    constructor(locationLatitude: Number, locationLongitude: Number, locationDateTime: Date, locationUserId: String, locationId: String) {
        this.latitude = locationLatitude;
        this.longitude = locationLongitude;
        this.dateTime = locationDateTime;
        this.userId = locationUserId;
        this.id = locationId;
    }
}
