import { Component, inject } from '@angular/core';
import { ServiceZAQ } from '../../services/ServiceZAQ';
import { Peca } from '../../Interface/peca';
import { PoTableAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.css'
})
export class MonitorComponent {
  private serviceZAQ = inject(ServiceZAQ)

  public columns = this.serviceZAQ.getColumns
  public items: Array<any> = []
  public actions: Array<PoTableAction> = [
    {label: 'Alterar status', action:this.changeStat.bind(this)}
  ]

  constructor() {
    this.processItems();
  }

  processItems(){
    this.serviceZAQ.getAllItens().subscribe({
      next: (value:Peca) => {
        this.items = [
          value.codigo,
          value.lote,
          value.classificacao,
          value.url,
          value.descricao,
          value.status,
        ]  
      },
    })
  }

  private changeStat(currentStat:any) {
    alert(currentStat)
  }
}
