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
                switch (error.status) {
                    case 400:
                        reason = 'Błędne zapytanie. Jeśli wszystko jest poprawnie wykonane, skontaktuj się z administratorem.';
                        break;
                    case 401:
                        reason = 'Brak aktywnej sesji.';
                        break;
                    case 403:
                        reason = 'Nieautoryzowane połączenie. Zaloguj się ponownie, jeśli to nie pomoże, skontaktuj się z administratorem.';
                    case 404:
                        reason = 'Nie znaleziono danych. Odśwież stronę, jeśli to nie pomoże, skontaktuj się z administratorem.'
                        break;
                    default:
                        reason = 'Błąd serwera. Spróbuj później, jeśli to nie pomoże, skontaktuj się z administratorem.'
                }
                return throwError(reason);
            })
        );
    }

}