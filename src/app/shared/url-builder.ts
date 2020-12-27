import { config } from '../../environments/environment';

export class UrlBuilder {
    
    public static getUrl(url: string) {
        return `${config.apiUrl + url}`
    }
}