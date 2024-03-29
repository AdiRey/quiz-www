import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AbstractResponseArrayModel, AbstractRestApiModel, PaginationModel } from "./abstract-rest-api.model";
import { RestBuilder } from "./rest-builder";

export abstract class AbstractRestApi<M = Object> {

    protected path: string;

    constructor(
        readonly httpClient: HttpClient
    ) {}

    public getAll<T = M>(
        model?: PaginationModel<M>
    ): Observable<AbstractResponseArrayModel<T>> {
        return this.httpClient
            .get<AbstractResponseArrayModel<T>>(
                RestBuilder.getUrl(model?.additionalPath? this.path + '/' + model.additionalPath : this.path), {
                    params: RestBuilder.getParams<M>(model)
                }
            );
    };

    public get<T = M>(
        model: AbstractRestApiModel
    ): Observable<T> {
        return this.httpClient
            .get<T>(
                RestBuilder.getUrl(model.additionalPath? this.path + '/' + model.additionalPath : this.path)
            );
    };

    public save<T = null>(
        model: AbstractRestApiModel
    ): Observable<T> {
        return this.httpClient.post<T>(
            RestBuilder.getUrl(model.additionalPath? this.path + '/' + model.additionalPath : this.path),
            model.body === undefined? null : model.body
        );
    };

    public update<T = M>(
        model: AbstractRestApiModel
    ): Observable<T> {
        return this.httpClient.put<T>(
            RestBuilder.getUrl(model.additionalPath? this.path + '/' + model.additionalPath : this.path),
            model.body === undefined? null : model.body
        );
    }

    public delete<T = null>(
        model: AbstractRestApiModel
    ): Observable<T> {
        return this.httpClient.delete<T>(
            RestBuilder.getUrl(model.additionalPath? this.path + '/' + model.additionalPath : this.path)
        );
    }
}
