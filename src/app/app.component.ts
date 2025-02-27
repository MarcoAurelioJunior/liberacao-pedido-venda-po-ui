import { Component } from '@angular/core';
import { ProtheusLibCoreModule } from '@totvs/protheus-lib-core';
import { ProAppConfigService } from '@totvs/protheus-lib-core';
import { PoInfoComponent, PoMenuItem } from '@po-ui/ng-components';
import { ProThreadInfoService } from '@totvs/protheus-lib-core';
import { ProUserInfo } from '@totvs/protheus-lib-core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public user: any

  constructor(
    private proAppConfigService: ProAppConfigService,
    private infoSerivce: ProThreadInfoService,
    private router: Router
  ){}

  readonly menus: Array<PoMenuItem> = [
    { label: 'Monitor', action: this.onClick.bind(this) },
    { label: 'DashBoard', action: this.dashClick.bind(this) },
    { label: 'Sair', action: this.sair.bind(this) },
  ];

  private onClick() {
    this.router.navigate(['/', 'browse'])
  }

  private dashClick(){
    this.router.navigate(['/', 'dash'])
  }

  private sair(){
    if(!this.proAppConfigService.insideProtheus()){
      alert("Clique não veio do Protheus")
    }else{
      this.proAppConfigService.callAppClose()
    }
  }

  ngOnInit(){
    this.user = this.getUserInfo()
  }

  getUserInfo(): any {
    this.infoSerivce.getUserInfoThread().subscribe({
      next: (res: ProUserInfo) => {
        return res.id
      }
    });
  }

}
