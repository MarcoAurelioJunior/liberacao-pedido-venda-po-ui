import { Component, inject } from '@angular/core';
import { ProAppConfigService, ProJsToAdvplService, ProSessionInfoService } from '@totvs/protheus-lib-core';
import { PoBreadcrumb, PoInfoComponent, PoMenuItem, PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { ProThreadInfoService } from '@totvs/protheus-lib-core';
import { ProUserInfo } from '@totvs/protheus-lib-core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  endPointProt:string = ''
  public user: any
  //public apiBaseUrl: any

  private proAppConfigService = inject(ProAppConfigService)
  
  

  constructor(
    private infoSerivce: ProThreadInfoService,
    private proJsToAdvplService: ProJsToAdvplService,
    private poNotification: PoNotificationService,
    private proSessionInfoService: ProSessionInfoService,
    private router: Router,
    private http: HttpClient
  ){

    if (this.proAppConfigService.insideProtheus()) {
      this.proAppConfigService.loadAppConfig();

    }else{
      //this.poNotification.error("Não está no Protheus");
    }
  }

  async loadAppConfig(): Promise<string> {
    try {
      const response = await firstValueFrom(this.http.get<any>('assets/data/appConfig.json'));

      this.endPointProt = response.api_baseUrl;
      return response.api_baseUrl
    } catch (error) {
      //console.error('Error loading app config', error);
      throw error; // You might want to handle the error appropriately in your application
    }
  }

  menus: Array<PoMenuItem> = [
    {
      label: 'Cadastro',
      action: this.dashClick.bind(this),
      icon: 'po-icon po-icon-home',
      shortLabel: 'DashBoard',
    },
    {
      label: 'Sair',
      action: this.sair.bind(this),
      icon: 'po-icon po-icon-exit',
      shortLabel: 'Sair',
    },

  ];

  private dashClick(){
    this.router.navigate(['/', 'browse'])
  }

  private sair(){
    if(this.proAppConfigService.insideProtheus()){
      this.proAppConfigService.callAppClose(false);
    }else{
      localStorage.removeItem('username')
      this.router.navigate(['/', 'login'])

    }
  }

  ngOnInit(): void {
    this.router.navigate(['/', 'browse'])
  }

  // async ping(){
  //   try {
  //     const data = await this.servicePing.getParam().subscribe({
  //       next: (response) => {
  //         console.log('Response:', response);
  //       },
  //       error: (error) => {
  //         console.error('Error:', error);
  //       },
  //       complete: () => {
  //         console.log('Request completed');
  //       }

  //     })
  //   } catch (error) {
  //     console.error('Error fetching parameters:', error);
  //   }
  // }


}
