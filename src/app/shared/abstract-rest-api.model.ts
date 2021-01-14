import { HttpParams } from "@angular/common/http";

export interface AbstractRestApiModel {
    additionalPath?: string;
    body?: any;
    observe?: Observe;
    params?: HttpParams | { [param: string]: string | Array<string> };
    reportProgress?: boolean;
}

export interface PaginationModel<M> {
    additionalPath?: string;
    pagination?: {
        direction: string;
        page: string;
        size: string;
        orderBy: string;
    }
    params?: { [K in keyof M]: M[K] | Array<M[K]> };
}

export interface AbstractResponseArrayModel<M = any> {
    list: Array<M>;
    paginator: {
        pageNumber: number;
        pageSize: number;
        totalElements: number;
    }
}

export enum Observe {
    BODY = 'body',
    EVENTS = 'events',
    RESPONSE = 'response'
}
