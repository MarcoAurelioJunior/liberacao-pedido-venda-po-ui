import { Component, inject, OnInit } from '@angular/core';
import { DashService } from '../../services/dashServiceZAQ';
import { ConstantPool } from '@angular/compiler';
import { PoChartSerie } from '@po-ui/ng-components';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css'
})
export class DashComponent implements OnInit{
  private retDash = inject(DashService)

  public retAFotografar = 0
  public retReprocessado = 0
  public retFinalizado = 0

  public chartCont:Array<PoChartSerie> = []

  ngOnInit(): void {
    this.retDash.getInfoDash().subscribe({
      next: (value) => {
        this.retAFotografar = value.items[0].a_fotografar
        this.retReprocessado = value.items[0].reprocessando
        this.retFinalizado = value.items[0].finalizado

        this.chartCont = [
          { label: 'A Fotografar', data: value.items[0].a_fotografar },
          { label: 'Peças reprocessando', data: value.items[0].reprocessando },
          { label: 'Peças Fotografadas', data: value.items[0].finalizado }
        ]
      }
    })      

    
    
  }
  
}
