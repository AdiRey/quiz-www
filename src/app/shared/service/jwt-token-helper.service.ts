import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class JwtTokenHelper {

    constructor() {}

    public isTokenExpired(token: string) {
        // TODO
        return false;
    }
}
