export class UrlContaner {
    // public static readonly commonURL = 'http://geostat-app.azurewebsites.net';
    public static readonly commonURL = 'http://geostat-alpha.azurewebsites.net';

    public static readonly getLocationsURL = UrlContaner.commonURL + '/tables/Location';
    public static readonly getGroupsURL = UrlContaner.commonURL + '/tables/Group';
    public static readonly getGroupUsersURL = UrlContaner.commonURL + '/tables/GroupUser';
    public static readonly getUsersURL = UrlContaner.commonURL + '/tables/GeoStatUser';
    public static readonly registerURL = UrlContaner.commonURL + '/api/account/register/post';
    public static readonly authURL = UrlContaner.commonURL + '/api/account/authorise/post';

    public static getLocationsFromDateURL(date: Date) {
        return UrlContaner.getLocationsURL + `$filter=dateTime gt DateTimeOffset\'${date}\'`;
    }

    public static getLocationsForUserURL(userId: string) {
        return UrlContaner.getLocationsURL + '?$filter=(UserId%20eq%20%27' + userId + '%27)';
    }

    public static getUserByEmailURL(email: string) {
        return UrlContaner.getUsersURL + '?$filter=(Email%20eq%20%27' + email + '%27)';
    }

    public static getGroupForUserURL(id: string) {
        return UrlContaner.getGroupsURL + '?$filter=(UserId%20eq%20%27' + id + '%27)';
    }

    public static getUsersForGroupURL(groupId: string) {
        return UrlContaner.getGroupUsersURL + '?$filter=(GroupId%20eq%20%27' + groupId + '%27)';
    }

    public static getUserByIdURL(userId: string) {
        return UrlContaner.getUsersURL + '?$filter=(Id%20eq%20%27' + userId + '%27)';
    }

    public static getGroupByIdURL(groupId: String) {
        return UrlContaner.getGroupsURL + '?$filter=(Id%20eq%20%27' + groupId + '%27)';
    }
}
