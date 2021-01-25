import { HttpParams } from '@angular/common/http';
import { config } from '../../environments/environment';
import { PaginationModel } from './abstract-rest-api.model';

export class RestBuilder {
    
    public static getUrl(url: string) {
        return `${config.apiUrl + url}`
    }

    public static getParams<T = Object>(paramObject: PaginationModel<T>): HttpParams {
        let params: HttpParams = new HttpParams();
        for (let prop in paramObject.pagination) {
            params = params.append(prop, paramObject.pagination[prop]);
        }
        for (let prop in paramObject.params) {
            if (paramObject.params[prop]) {
                params = params.append(prop, String(paramObject.params[prop]));
            }
        }
        return params;
    }
}