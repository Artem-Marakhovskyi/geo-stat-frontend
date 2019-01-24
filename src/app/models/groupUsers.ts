import { GeoStatUser } from './geoStatUser';

export class GroupUsers {
    id: String;
    label: String;
    creatorId: String;
    users: GeoStatUser[];

    constructor(
        id: String,
        label: String,
        creatorId: String,
        users: GeoStatUser[]
    ) {
        this.id = id;
        this.label = label;
        this.creatorId = creatorId;
        this.users = users;
    }
}
