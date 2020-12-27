import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class Interceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const token = localStorage.getItem('token');

        if (!!token) {
            headers['Authorization'] = "Bearer " + token;
        }

        req = req.clone({
            setHeaders: headers
        });
        
        return next.handle(req).pipe(
            catchError((error: any) => {
                let reason: string;
                switch (error.status) {
                    case 401:
                        reason = 'Brak aktywnej sesji';
                        break;
                    case 404:
                        reason = 'Nie znaleziono danych'
                        break;
                    default:
                        reason = 'Błąd serwera'
                }
                return throwError(reason);
            })
        );
    }

}