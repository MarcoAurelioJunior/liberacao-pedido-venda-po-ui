import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { PoHttpRequestModule } from '@po-ui/ng-components';


@Injectable({ providedIn: "root" })
export class PostParamService {
    private apiUrl = "http://localhost:8080/rest/wsparfat/postParam"; // Substitua pela URL real da API

    constructor(private http: HttpClient) {}

    public postParam(mvPar: string, valor: string): boolean {
        const token = localStorage.getItem("access_token"); // Pegue o token salvo no login
        const data = { "parametro": mvPar, "valor": valor };

        let headers = new HttpHeaders({
            "Content-Type": "application/json",
        });

        // Se houver um token, adicione ao cabeçalho
        // if (token) {
        //     headers = headers.set("Authorization", `Bearer ${token}`);
        // }

        this.http.post<any>(this.apiUrl, data, { headers }).subscribe({
            next: (response) => {
                console.log("Resposta da API:", response);
                // Aqui você pode fazer algo com a resposta, se necessário
            },
            error: (error) => {
                this.handleError(error);
            }
        })

        return false
    }

    private handleError(error: HttpErrorResponse) {
        console.error("Erro na requisição:", error);
        return throwError(() => new Error("Erro ao processar a solicitação."));
    }
}
