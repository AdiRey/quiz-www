import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractRestApi } from "@shared/abstract-rest-api.service";

@Injectable({
    providedIn: 'root'
})
export class UserRestApiService extends AbstractRestApi {

    protected path: string = 'user';

    constructor(
        private readonly _http: HttpClient
    ) {
        super(_http);
    }
}