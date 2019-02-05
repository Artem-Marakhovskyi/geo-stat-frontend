import { GeoStatUser } from './geoStatUser';

export class GroupUsers {
    id: string;
    label: string;
    creatorId: string;
    users: GeoStatUser[];

    constructor(
        id: string,
        label: string,
        creatorId: string,
        users: GeoStatUser[]
    ) {
        this.id = id;
        this.label = label;
        this.creatorId = creatorId;
        this.users = users;
    }
}
