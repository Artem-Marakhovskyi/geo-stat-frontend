import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MapConfiguration {
    public zoom: Number = 13;
    public kharkivLatitude: Number = 50.005698;
    public kharkivLongitude: Number = 36.229140;
    public colors = ['FF0000',
        '00FF00',
        '0000FF',
        'FFFF00',
        '00FFFF',
        'FF00FF',
        'FFA500',
        'FFFFFF',
        'C0C0C0'
    ];

    constructor() { }

    public shuffleColors() {
        for (let i = this.colors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.colors[i], this.colors[j]] = [this.colors[j], this.colors[i]];
        }
        return this.colors;
    }

}