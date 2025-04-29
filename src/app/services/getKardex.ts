import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { LoginData } from "../Interface/login";
import { PoHttpRequestModule } from '@po-ui/ng-components';

@Injectable({providedIn: 'root'})

export class Kardex {
    private http = inject(HttpClient);
    private router = inject(Router);

    public getKard(id:any): Observable<Promise<any>> {
        const url = `http://localhost:8080/rest/wscolet/kardex?id=${id}`; 
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.get<any>(url, { headers })
    }

    public getKardAll(): Observable<Promise<any>> {
        const url = `http://localhost:8080/rest/wscolet/kardex`; 
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-PO-Screen-Lock': 'true',
        });

        return this.http.get<any>(url, { headers })
    }
}