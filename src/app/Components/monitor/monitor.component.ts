import { Component, Inject, inject, OnInit, viewChild, ViewChild } from '@angular/core';
import { Peca } from '../../Interface/peca';
import { PoBreadcrumb, PoComboOption, PoModalAction, PoModalComponent, PoPageAction, PoRadioGroupComponent, PoRadioGroupOption, PoTableAction, PoButtonComponent, PoTableColumn, PoDynamicFormField, PoNotificationService, PoPageFilter, PoListViewAction, PoListViewLiterals, PoToolbarAction, PoButtonGroupItem } from '@po-ui/ng-components';
import { LocationStrategy } from '@angular/common';
import { PoPageDynamicTableField, PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { Sda } from '../../services/getSda';
import { Router } from '@angular/router';
import { Kardex } from '../../services/getKardex';
import { ProJsToAdvplService } from '@totvs/protheus-lib-core';
import { Cb7 } from '../../services/getCB7';


@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.css',
  standalone: false
})
export class MonitorComponent{
  @ViewChild('detailsModal', { static: true }) detailsModalElem!: PoModalComponent;
  @ViewChild('pageSlide', { static: true }) pageSlide!: PoModalComponent;
  @ViewChild('modalFiltros', { static: true }) modalFiltro!: PoModalComponent;
  @ViewChild('modalDet', { static: true }) modalDetalhes!: PoModalComponent;

  public coluna1 = ''
  public coluna2 = ''
  public coluna3 = ''

  public disabledCheck:boolean = false

  buttonGrp: Array<PoButtonGroupItem> = [
    {
      label: "Análisar Progresso",
      action: () => {
        this.pageSlide.open()
      },
      icon: "po-icon po-icon-chart"
    },
    {
      label: "Mostrar KPI",
      action: () => {
        this.blindStatus()
      }
    }
  ]

  height = 400
  hiringProcesses!: Array<any>;
  hiringProcessesFiltered!: Array<object>;
  labelFilter: string = '';
  modalDetail: boolean = false;
  selectedActionItem = {};
  statusOs!:any

  colsFiltred:Array<number> = []
  class = 'po-md-4'

  public customLiterals: PoListViewLiterals = {
    showDetails: 'Exibir Destino',
    hideDetails: 'Ocultar Destino'
  };

  getSda = inject(Sda)
  getKardex = inject(Kardex)
  getCb7 = inject(Cb7)

  items: Array<any> = []
  itemsSDA: Array<any> = []

  filteredItems: Array<any> = [];


  readonly filterSettings: PoPageFilter = {
    placeholder: 'Search'
  };

  

  constructor(
    private poNotification: PoNotificationService,
    private router: Router,
    private proJsToAdvplService: ProJsToAdvplService
  ){}

  ngOnInit() {

    this.blindStatus()
    this.poNotification.setDefaultDuration(1000)

    setInterval(() => {
      
      
      

    }, 5000);

    this.getCb7.getCb7().subscribe({
      next: (data: any) => {
      if (!data.items || data.items.length === 0) {
        this.items = []; // Lista vazia
        this.filteredItems = [];
        return;
      }

      this.items = data.items.slice(-8).reverse(); // Pega os últimos 6 itens e inverte a ordem
      this.filteredItems = this.limitedItems(9); // Atualiza os itens filtrados com o limite de 6
      this.poNotification.success('Dados atualizados com sucesso');
      },
      error: (err: any) => {
      console.error('Erro ao buscar dados do Kardex:', err);
      this.poNotification.error('Erro ao atualizar os dados');
      }
    });

  }

  // filtered(event: any) {
  //   const camposParaBuscar = event.filter;
  //   const termo = event.value?.toLowerCase();
  
  //   // Se não digitou nada, mostra todos os itens
  //   if (!termo || termo.trim() === '') {
  //     this.hiringProcessesFiltered = [...this.items];
  //     return;
  //   }
  
  //   this.hiringProcessesFiltered = this.items.filter((item: any) => {
  //     return camposParaBuscar.some((campo: string) => {
  //       const valorCampo = String(item[campo] || '').toLowerCase();
  //       return valorCampo.includes(termo);
  //     });
  //   });
  // }

  itemClicked(item:any){
    localStorage.setItem('produtoDescricao', item.produtoDescricao)
    localStorage.setItem('codigoProduto', item.codigoProduto)
    localStorage.setItem('local', item.local)
    localStorage.setItem('parcelaTotal', item.parcelaTotal)
    localStorage.setItem('estorno', item.estorno)
    localStorage.setItem('observacao', item.observacao)
    localStorage.setItem('cf', item.cf)
    localStorage.setItem('ordemProducao', item.ordemProducao)
    localStorage.setItem('numeroSequencia', item.numeroSequencia)
    localStorage.setItem('filial', item.filial)
    localStorage.setItem('tipoMovimento', item.tipoMovimento)
    localStorage.setItem('quantidade', item.quantidade)
    localStorage.setItem('loteControle', item.loteControle)
    localStorage.setItem('endereco', item.endereco)
    this.router.navigate(['/detail'])
  }

  public limitedItems(limit: number) {
    if (this.items.length === 0) return []; // Lista vazia
    if (limit <= 0) return []; // Limite inválido
  
    // Pega os últimos `limit` itens e inverte a ordem
    return this.items.slice(-limit).reverse();
  }
  


  public blindStatus() {
    const viewStatusElement = document.getElementById('view-status');
    if (viewStatusElement) {
      const isHidden = viewStatusElement.style.display === "none";
      viewStatusElement.style.display = isHidden ? "block" : "none";

      this.height = isHidden ? 465 : 632;
      const limit = isHidden ? 6 : 8;
      this.filteredItems = this.limitedItems(limit);
    } else {
      console.warn('Element with id "view-status" not found.');
    }
  }

  public act1(){

  }

  public act2(){
    
  }

  public act3(){
    
  }

  public act4(){
    
  }


  public titleIncresed:any
  
  elementInc(el:any){
    this.titleIncresed = el.srcElement.innerText

  }

  secundaryAct: PoModalAction = {
    action: (item:any) => {
      this.filterColumn();
    },
    label: 'Aplicar'
  };

  primaryAct: PoModalAction = {
    action: () => {
      this.resetCol();
    },
    label: 'Alterar Colunas',
    danger: true
  };

  filterChanged(el: number[]) {
    if(el.length >= 3){
      this.coluna1 = el[0].toString()
      this.coluna2 = el[1].toString()
      this.coluna3 = el[2].toString()
      this.disabledCheck = true
    }else{
      
    }
  }

  resetCol(){
    this.disabledCheck = false
  }

  filterColumn() {

    

    this.modalFiltro.close()
  }
  
  tst(el:any){
    console.log(el.target.innerText)
    this.modalDetalhes.open()
  }

}
