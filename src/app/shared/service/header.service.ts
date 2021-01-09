import { Injectable } from "@angular/core";
import { HeaderModel } from "@shared/model/service/header-service.model";
import { BehaviorSubject, Observable, Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class HeaderService {

    private _headerModel: Subject<HeaderModel> = new Subject<HeaderModel>();

    constructor() {}

    public setAction(headerModel: HeaderModel) {
        setTimeout(() => this._headerModel.next(headerModel), 0);
    }

    public getAction(): Observable<HeaderModel> {
        return this._headerModel.asObservable();
    }
}