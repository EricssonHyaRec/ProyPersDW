import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private auth: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req;
        const token = this.auth.loadToken();
        const apikey = 'ok8G9wPyU2FouLHR4n5vKu8rehSplu7vG0f3';

        
        if (token) {
            request = req.clone({
                setHeaders: {
                    Authorization: `Token ${token}`, 
                    'X-API-KEY': apikey
                }
            });
        }
        
        return next.handle(request);
    }

}