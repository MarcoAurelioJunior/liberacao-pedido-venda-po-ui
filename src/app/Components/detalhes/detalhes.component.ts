import { Component, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PoBreadcrumb, PoDynamicFormField, PoTableColumn } from '@po-ui/ng-components';
import { Kardex } from '../../services/getKardex';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent {

  serviceKardex = inject(Kardex)
  public kardex: any = []

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: `${localStorage.getItem('produtoDescricao')}`, link: '/browse' }, { label: 'Detalhes' }]
  };

  public fields: Array<PoDynamicFormField> = [
    { property: 'produtoDescricao', label: 'Descrição do Produto', gridColumns: 6 },
    { property: 'codigoProduto', label: 'Código do Produto', gridColumns: 6 },
    { property: 'parcelaTotal', label: 'Parcela Total', gridColumns: 4 },
    { property: 'estorno', label: 'Estorno', gridColumns: 8 },
    { property: 'observacao', label: 'Observação', gridColumns: 12},
    { property: 'cf', label: 'Tipo Requisição/Devolução', gridColumns: 4, divider: 'Outros' },
    { property: 'ordemProducao', label: 'Ordem de Produção', gridColumns: 4 },
    { property: 'numeroSequencia', label: 'Número de Sequência', gridColumns: 4 },
    { property: 'tipoMovimento', label: 'Tipo de Movimento', gridColumns: 4 },
    { property: 'quantidade', label: 'Quantidade', gridColumns: 8},
    { property: 'local', label: 'Local', gridColumns: 4, divider: 'Controle'  },
    { property: 'loteControle', label: 'Lote de Controle', gridColumns: 4 },
    { property: 'endereco', label: 'Endereço', gridColumns: 4 }
  ];

  public url = `http://localhost:8080/rest/wscolet/kardex?id=`;

  public columns: Array<PoTableColumn> = [
    { 
      property: 'tipoMovimento', 
      label: 'Tipo de Movimento', 
      type: 'label', 
      labels: [
        { value: 'Entrada', color: 'color-11', label: 'Entrada' },
        { value: 'Sa�da', color: 'color-07', label: 'Saída' }
      ]
    },
    { property: 'produtoDescricao', label: 'Descrição do Produto' },
    { property: 'local', label: 'Local' },
    { property: 'quantidade', label: 'Quantidade' },
    { property: 'loteControle', label: 'Lote de Controle' },
    { property: 'endereco', label: 'Endereço' }
  ];

  public value: any = {};

  async ngOnInit(): Promise<void> {
    this.url = this.url + localStorage.getItem('codigoProduto');
    this.value = {
      produtoDescricao: localStorage.getItem('produtoDescricao') || '',
      codigoProduto: localStorage.getItem('codigoProduto') || '',
      local: localStorage.getItem('local') || '',
      parcelaTotal: localStorage.getItem('parcelaTotal') || '',
      estorno: localStorage.getItem('estorno') || '',
      observacao: localStorage.getItem('observacao') || '',
      cf: localStorage.getItem('cf') || '',
      ordemProducao: localStorage.getItem('ordemProducao') || '',
      numeroSequencia: localStorage.getItem('numeroSequencia') || '',
      filial: localStorage.getItem('filial') || '',
      tipoMovimento: localStorage.getItem('tipoMovimento') || '',
      quantidade: localStorage.getItem('quantidade') || '',
      loteControle: localStorage.getItem('loteControle') || '',
      endereco: localStorage.getItem('endereco') || ''
    };

  }


}
