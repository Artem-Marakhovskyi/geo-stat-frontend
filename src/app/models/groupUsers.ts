import { GeoStatUser } from './geoStatUser';

export class GroupUsers {
    id: string;
    label: string;
    creatorId: string;
    creatorName: string;
    users: GeoStatUser[];

    constructor(
        id: string,
        label: string,
        creatorId: string,
        creatorName: string,
        users: GeoStatUser[]
    ) {
        this.id = id;
        this.label = label;
        this.creatorId = creatorId;
        this.creatorName = creatorName;
        this.users = users;
    }
}
