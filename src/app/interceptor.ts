import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { LocalStorage } from './shared/service/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class Interceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const token = LocalStorage.getToken();

        if (!!token) {
            headers['Authorization'] = "Bearer " + token;
        }

        req = req.clone({
            setHeaders: headers
        });
        
        return next.handle(req).pipe(
            timeout(10000),
            catchError((error: any) => {
                let reason: string;
                console.log(error);
                switch (error.status) {
                    case 401:
                        reason = 'Brak aktywnej sesji';
                        break;
                    case 404:
                        reason = 'Nie znaleziono danych. Odśwież stronę, jeśli to nie pomoże, skontaktuj się z administratorem.'
                        break;
                    default:
                        reason = 'Błąd serwera'
                }
                return throwError(reason);
            })
        );
    }

}