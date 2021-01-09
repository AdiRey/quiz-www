import { Injectable } from "@angular/core";
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class JwtTokenHelper {

    constructor() {}

    public isTokenExpired(token: string) {
        const tokenInfo = jwt_decode(token);
        return new Date(tokenInfo['exp'] * 1000) <= new Date();
    }
}
