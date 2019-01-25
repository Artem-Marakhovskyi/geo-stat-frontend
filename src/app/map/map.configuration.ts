import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MapConfiguration {
    public zoom: Number = 13;
    public kharkivLatitude: Number = 50.005698;
    public kharkivLongitude: Number = 36.229140;

    constructor() { }

}