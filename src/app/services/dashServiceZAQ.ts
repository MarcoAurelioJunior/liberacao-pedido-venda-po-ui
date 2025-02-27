import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashService {

  private http = inject(HttpClient)
  private url: string = environment.WsDash

  public getInfoDash(){
    return this.http.get<any>(this.url);
  }

}
