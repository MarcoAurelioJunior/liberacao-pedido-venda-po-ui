import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PoTableColumn, PoTagType } from '@po-ui/ng-components';
import { environment } from '../../environments/environment';
import { Peca } from '../Interface/peca';

@Injectable({
  providedIn: 'root'
})
export class ServiceZAQ {

  private http = inject(HttpClient)
  private url: string = environment.WsPeca

  public getColumns: Array<PoTableColumn> = [
    { 
      property: 'status', 
      label: 'Status',
      type:'subtitle',
      subtitles: [
        {value: '1', label: 'A fotografar', color:'color-12', content:'01',},
        {value: '1', label: 'A fotografar', color:'color-11', content:'01',},
        {value: '1', label: 'A fotografar', color:'color-10', content:'01',},
      ] 

    },
    { property: 'idPeca', label: 'ID', width: '80px' },
    { property: 'descricao', label: 'Descrição' },
  ];

  public getItemsbyId(id:string): any{
    return this.http.get<Peca>(`${this.url}${id}`)  
  }

  public getAllItens(){
    return this.http.get<any>(`${this.url}`)  
  }

}
