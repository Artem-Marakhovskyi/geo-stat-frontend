export class Location {
    latitude: Number;
    longitude: Number;
    dateTime: Date;
    userId: String;
    id: String;

    constructor(
        latitude: Number,
        longitude: Number,
        dateTime: Date,
        userId: String,
        id: String
    ) {
        this.id = id;
        this.longitude = longitude;
        this.latitude = latitude;
        this.dateTime = dateTime;
        this.userId = userId;
    }
}
