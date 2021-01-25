import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractRestApi } from "@shared/abstract-rest-api.service";


@Injectable({
    providedIn: 'root'
})
export class UserQuizRestApiService extends AbstractRestApi {

    protected path: string = 'user-quiz'

    constructor(
        private readonly _http: HttpClient
    ) {
        super(_http);
    }
}