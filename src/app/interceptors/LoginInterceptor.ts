import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";

export class LoginInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if(token){
            const cloneReq = req.clone(
                {
                    headers:new HttpHeaders().set('Authorization',`Bearer ${token}`).set('Accept','application/json')
                    
                }
            );
            return next.handle(cloneReq);
            
        } else{
            return next.handle(req);
        }
    }

}
export const LoginInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: LoginInterceptor,
    multi:true
}