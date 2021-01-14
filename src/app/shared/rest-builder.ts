import { HttpParams } from '@angular/common/http';
import { config } from '../../environments/environment';

export class RestBuilder {
    
    public static getUrl(url: string) {
        return `${config.apiUrl + url}`
    }

    public static getParams(paramObject: Object): HttpParams {
        if (!paramObject) {
            return null;
        }
        let params: HttpParams = new HttpParams();
        for (let prop in paramObject) {
            params = params.append(prop, paramObject[prop]);
        }
        return  params;
    }
}