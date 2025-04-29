import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class JwtInterceptor implements HttpInterceptor {

    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        localStorage.setItem('access_token',"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBKd3RQdWJsaWNLZXlGb3IyNTYifQ.eyJpc3MiOiJUT1RWUy1BRFZQTC1GV0pXVCIsInN1YiI6IkFkbWluaXN0cmFkb3IiLCJpYXQiOjE3NDU5NDQ1NzIsInVzZXJpZCI6IjAwMDAwMCIsImV4cCI6MTc0NTk0ODE3MiwiZW52SWQiOiJwMTIifQ.DhO5-ydPtI16nGfSfmfr3LVSHDnvIe4bctoyDfFpL5meqtx6ux3Mj7TMiJ-lyy6iux0GMCiKTW3CKWkrWMa5s1f0iH9n9dN9NT29GPFnb-1JoJ3BzvuL8CeahK_bpIkVbcUfWsYVfkf3AoikeJC61IJQcoPcI6osf0m8pfxrtcBFhC6YuWrTDMlj2_inkv8qzXY0hNOfjfPFNM_emss8KDQUafkM09Gr2kqGRDYJG5nMmpRcFTtCLIDVZtDzYaRZQYaKFhnOtOItY1m_WMNX8kxGHC1ssE7IwNBVCuQBWFjLVbYP6gvTkk_v817UEWwsVSGZEPAEuu0Bjd2Jl3o9PA")

        // if(environment.ambiente === 'protheus'){
        //     return next.handle(req);
        // }

        let token = localStorage.getItem('access_token')

        if(typeof token === 'string'){
            req = req.clone({setHeaders: {Authorization: `Bearer ${token}`}})
        }

        return next.handle(req);

    }
}