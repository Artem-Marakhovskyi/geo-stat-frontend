export class Location {
    latitude: number;
    longitude: number;
    dateTime: Date;
    userId: string;
    id: string;

    constructor(
        latitude: number,
        longitude: number,
        dateTime: Date,
        userId: string,
        id: string
    ) {
        this.id = id;
        this.longitude = longitude;
        this.latitude = latitude;
        this.dateTime = dateTime;
        this.userId = userId;
    }
}
