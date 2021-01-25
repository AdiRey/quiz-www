import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractRestApi } from "../abstract-rest-api.service";


@Injectable({
    providedIn: 'root'
})
export class CasSecurityRestApi extends AbstractRestApi {

    protected path: string = 'cas-security';

    constructor(
        private readonly _http: HttpClient
    ) {
        super(_http);
    }
}