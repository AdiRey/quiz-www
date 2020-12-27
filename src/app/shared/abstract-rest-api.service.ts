import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UrlBuilder } from "./url-builder";

export abstract class AbstractRestApi {

    protected path: string;

    constructor(
        readonly httpClient: HttpClient
    ) {}

    public get<T = Object>(
        additionalPath?: string
    ): Observable<T> {
        return this.httpClient
            .get(
                UrlBuilder.getUrl(additionalPath? this.path + '/' + additionalPath : this.path)
            ) as Observable<T>;
    }
}