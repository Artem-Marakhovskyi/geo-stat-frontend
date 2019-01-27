export class UrlContaner {
    public static readonly commonURL = 'http://geostat-app.azurewebsites.net';

    public static readonly getLocationsURL = UrlContaner.commonURL + '/tables/Location';
    public static readonly getGroupsURL = UrlContaner.commonURL + '/tables/Group';
    public static readonly getGroupUsersURL = UrlContaner.commonURL + '/tables/GroupUser';
    public static readonly getUsersURL = UrlContaner.commonURL + '/tables/GeoStatUser';

    public static getLocationsForUserURL(userId: String) {
        return UrlContaner.getLocationsURL + '?$filter=(UserId%20eq%20%27' + userId + '%27)';
    }

    public static getUsersForGroupURL(groupId: String) {
        return UrlContaner.getGroupUsersURL + '?$filter=(GroupId%20eq%20%27' + groupId + '%27)';
    }

    public static getGroupByIdURL(groupId: String) {
        return UrlContaner.getGroupsURL + '?$filter=(Id%20eq%20%27' + groupId + '%27)';
    }
}
